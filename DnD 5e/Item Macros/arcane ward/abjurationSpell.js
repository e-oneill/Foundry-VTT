/* BASED ON KUFFEH's MACROS: https://github.com/Kuffeh1/Foundry*/

const lastArg = args[args.length - 1];
let tactor;
console.log(lastArg)
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

       let effect = tactor.effects.find(i=> i.data.label === "Arcane Ward");
        if(!effect){ // not there
        }
        else {
            if (lastArg.itemData.type === "spell" && lastArg.itemData.data.school === "abj")
            {
                let Ward = tactor.data.data.classes.wizard.levels*2+tactor.data.data.abilities.int.mod;
                let maxHP = tactor.data.data.attributes.hp.max + Ward;
                console.log(Ward)
                if (tactor.data.data.attributes.hp.value < (maxHP)) 
                {
                    let refresh = lastArg.itemData.data.level * 2;
                    let currHP = tactor.data.data.attributes.hp.value;
                    let newHP = currHP + refresh;
                    if (newHP > maxHP)
                    {
                        newHP = maxHP;
                    }
                    await tactor.update({"data.attributes.hp.value" : newHP });
                    ChatMessage.create({content: `<em><b>Reminder</b> - ${tactor.name}'s Arcane Ward Refreshes! Their arcane ward regains ${newHP - currHP} hitpoint(s)</em>`});
                }
                
            }
        }