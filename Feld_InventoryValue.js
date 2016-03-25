/*:
 * @plugindesc Calculates the value of all items in inventory, 
 * when using Tsukihime's Multiple Inventories script.
 * @author Feldherren
 *
 * @param Item Value Variable
 * @desc ID of variable in which total item value will be stored.
 * @default 1
 *
 * @param Weapon Value Variable
 * @desc ID of variable in which total weapon value will be stored.
 * @default 2
 *
 * @param Armour Value Variable
 * @desc ID of variable in which total armour value will be stored.
 * @default 3
 *
 * @param Total Value Variable
 * @desc ID of variable in which total overall value will be stored.
 * @default 4
 *
 * @help Inventory Value v1.0, by Feldherren (rpaliwoda AT googlemail.com)

Plugin commands:
INVENTORYVALUE [inventory]
Calculates the value of items in the named inventory.

Free for use with commercial projects, though I'd appreciate being
contacted if you do use it in any games, just to know.

Calculates the value of all items, weapons and armour an inventory 
and outputs the results into specified variables. Requires Tsukihime's
Multiple Inventories script.
 */ 
(function(){
	var parameters = PluginManager.parameters('Feld_InventoryValue');

	function calculateInventoryValue(inventory) 
	{
		var inv = inventory;

		var weaponvalue = 0;
		for (var key in inv.weapons)
		{
			console.log($dataWeapons[key]);
			console.log(inv.weapons);
			weaponvalue += $dataWeapons[key].price * inv.weapons[key];
		}
		$gameVariables.setValue(parameters["Weapon Value Variable"], weaponvalue);

		var armorvalue = 0;
		for (var key in inv.armors)
		{
			armorvalue += $dataArmors[key].price * inv.armors[key];
		}
		$gameVariables.setValue(parameters["Armour Value Variable"], armorvalue);

		var itemvalue = 0;
		for (var key in inv.items)
		{
			itemvalue += $dataItems[key].price * inv.items[key];
		}
		$gameVariables.setValue(parameters["Item Value Variable"], itemvalue);


		$gameVariables.setValue(parameters["Total Value Variable"], weaponvalue + armorvalue + itemvalue );
	}

	var Feld_InventoryValue_aliasPluginCommand = Game_Interpreter.prototype.pluginCommand;

	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{

		Feld_InventoryValue_aliasPluginCommand.call(this,command,args);
		if(command == "INVENTORYVALUE" && args[0] != null)
		{
			//$gameMessage.add("TsukiHime multiple inventory script command detected");
			//$gameMessage.add("inventory: '" + args[0] + "'");
			// this IS working, yay
			calculateInventoryValue($gameParty.getInventory(args[0]));
		}
	}
})();