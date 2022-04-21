
function divineSmite() {
    console.log("Divine smite active")
    if (!["mwak"].includes(args[0].item.data.actionType)) return {};
    if (args[0].hitTargets.length < 1) return {};
    token = canvas.tokens.get(args[0].tokenId);
    actor = token.actor;
    if (!actor || !token || args[0].hitTargets.length < 1) return {};
    const paladinLevels = actor.getRollData().classes.paladin?.levels;
    if (!paladinLevels ) {
        MidiQOL.warn("Divine Smite: Trying to use divine smite and not a paladin");
        return {};
    }
    let target = canvas.tokens.get(args[0].hitTargets[0].id ?? args[0].hitTargets[0]._id);
    if (!target) MidiQOL.error("Divine Smite macro failed");

    if (game.combat) {
        const combatTime = `${game.combat.id} - ${game.combat.round + game.combat.turn / 100}`;
        const lastTime = actor.getFlat("midi-qol", "divineSmiteTime");
        if (combatTime === lastTime) {
            MidiQOL.warn("Divine Smite: divine smite already used this turn");
            return {};   
        }
    }

    let foundEnemy = true;

}

