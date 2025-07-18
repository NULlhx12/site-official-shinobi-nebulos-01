// Plugin Minecraft para integração (Java)
package com.shinobinebulos.store;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.CompletableFuture;

public class ShinobiStorePlugin extends JavaPlugin {
    
    private static final String API_URL = "https://shinobinebulos.vercel.app/api";
    
    @Override
    public void onEnable() {
        getLogger().info("Shinobi Store Plugin ativado!");
        
        // Registra comando /resgatar
        getCommand("resgatar").setExecutor(this);
        
        // Verifica compras pendentes a cada 5 minutos
        Bukkit.getScheduler().runTaskTimerAsynchronously(this, 
            this::checkPendingDeliveries, 0L, 6000L);
    }
    
    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!(sender instanceof Player)) {
            sender.sendMessage("Apenas jogadores podem usar este comando!");
            return true;
        }
        
        Player player = (Player) sender;
        
        if (command.getName().equalsIgnoreCase("resgatar")) {
            if (args.length != 1) {
                player.sendMessage(ChatColor.RED + "Uso: /resgatar <código>");
                return true;
            }
            
            String code = args[0].toUpperCase();
            redeemCode(player, code);
            return true;
        }
        
        return false;
    }
    
    private void redeemCode(Player player, String code) {
        CompletableFuture.runAsync(() -> {
            try {
                URL url = new URL(API_URL + "/delivery");
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setDoOutput(true);
                
                // Dados da requisição
                JSONObject data = new JSONObject();
                data.put("code", code);
                data.put("playerName", player.getName());
                
                // Envia dados
                try (OutputStream os = conn.getOutputStream()) {
                    byte[] input = data.toString().getBytes("utf-8");
                    os.write(input, 0, input.length);
                }
                
                // Lê resposta
                int responseCode = conn.getResponseCode();
                BufferedReader reader = new BufferedReader(new InputStreamReader(
                    responseCode == 200 ? conn.getInputStream() : conn.getErrorStream()
                ));
                
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();
                
                JSONObject result = new JSONObject(response.toString());
                
                // Processa resultado na thread principal
                Bukkit.getScheduler().runTask(this, () -> {
                    if (result.getBoolean("success")) {
                        JSONObject item = result.getJSONObject("item");
                        String itemType = item.getString("type");
                        String itemName = item.getString("name");
                        int quantity = item.getInt("quantity");
                        
                        // Entrega o item
                        deliverItem(player, itemType, itemName, quantity);
                        
                        player.sendMessage(ChatColor.GREEN + "✅ " + result.getString("message"));
                    } else {
                        player.sendMessage(ChatColor.RED + "❌ " + result.getString("error"));
                    }
                });
                
            } catch (Exception e) {
                Bukkit.getScheduler().runTask(this, () -> {
                    player.sendMessage(ChatColor.RED + "❌ Erro ao resgatar código. Tente novamente.");
                });
                getLogger().warning("Erro ao resgatar código: " + e.getMessage());
            }
        });
    }
    
    private void deliverItem(Player player, String itemType, String itemName, int quantity) {
        switch (itemType.toLowerCase()) {
            case "vip":
                // Dar rank VIP
                Bukkit.dispatchCommand(Bukkit.getConsoleSender(), 
                    "lp user " + player.getName() + " parent set " + itemName.toLowerCase());
                
                // Anunciar no servidor
                Bukkit.broadcastMessage(ChatColor.GOLD + "🎉 " + player.getName() + 
                    " adquiriu " + itemName + "!");
                break;
                
            case "spin":
                // Dar spins (exemplo com plugin de spins)
                for (int i = 0; i < quantity; i++) {
                    Bukkit.dispatchCommand(Bukkit.getConsoleSender(), 
                        "spin give " + player.getName() + " 1");
                }
                
                player.sendMessage(ChatColor.AQUA + "🎰 Você recebeu " + quantity + " spins!");
                break;
        }
        
        // Log da entrega
        getLogger().info("Item entregue: " + itemName + " para " + player.getName());
    }
    
    private void checkPendingDeliveries() {
        // Implementar verificação automática de entregas pendentes
        // Similar ao método redeemCode, mas para todos os jogadores online
    }
}
