/* BASED ON KUFFEH's MACROS: https://github.com/Kuffeh1/Foundry*/
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId)

let Ward = tactor.data.data.classes.wizard.levels*2+tactor.data.data.abilities.int.mod;
let HP = tactor.data.data.attributes.hp.value;
let maxHP = tactor.data.data.attributes.hp.max + Ward;
let newHP = Math.min(HP + Ward, maxHp);

await tactor.update({"data.attributes.hp.value" : newHP });
 ChatMessage.create({content: `<em><u>${tactor.name}</u> gains a protective shield of:<br><br> <b>${Ward} Hit points!</b><br><br>These last until ${tactor.name} takes a long rest.</em>`});