//get the selected tokens
let selectedTokens = canvas.tokens.controlled;

// console.log(selectedTokens)
async function levelUp(selectedActor, proportionalHealing) {
    
        var name = selectedActor.name;
        if (selectedActor.data.type = "character")
        {
          console.log("Selected player character: " + name);
          console.log(selectedActor)
          var currXP = selectedActor.data.data.details.xp.value;
          var xpToLevel = selectedActor.data.data.details.xp.max;
          var currLevel = selectedActor.data.data.details.level.value;
          if (currXP >= xpToLevel)
          {
              console.log(name + " has " + currXP + " xp, enough to level up");
              var prevMaxHP = selectedActor.data.data.attributes.hp.max;
              var currHP = selectedActor.data.data.attributes.hp.value;
              
              currXP = currXP - xpToLevel;
              let obj = {}
              obj['data.details.level.value'] = selectedActor.data.data.details.level.value + 1;
              obj['data.details.xp.value'] = currXP;
              obj['data.attributes.hp.value'] = currHP;
              await selectedActor.update(obj);
              // actor.update()
              // selectedActor.prepareData();
              var newMaxHP = selectedActor.data.data.attributes.hp.max;
              var hpDiff = newMaxHP - prevMaxHP;
              console.log(proportionalHealing);
              if (currHP > 0 && proportionalHealing)
              {
                  var newHP = Math.round(newMaxHP * (currHP/prevMaxHP));
                  var prevHP = currHP;
                  
                  // currHP = newHP;
                  let hpObj = {}
                  hpObj['data.attributes.hp.value'] = newHP; 
                  await selectedActor.update(hpObj);
              }
                  
      
              let results_html = `<h2>Level Up!</h2> ${name} has reached level ${selectedActor.data.data.details.level.value}.`;
              if (proportionalHealing)
                {
                    results_html += `<p>Due to proportional healing, ${name} regained ${newHP - prevHP} hitpoints. Giving him a new total of ${newHP}</p>`
                }
              ChatMessage.create({
                  user: game.user._id,
                  speaker: ChatMessage.getSpeaker(selectedActor),
                  content: results_html
                  });
          }
          else
          {
              console.log(name + " has insufficient XP to level up, they require another " + (xpToLevel - currXP) + "to level up");
          }
          }
      
}


for (var token of selectedTokens) {
    var selectedActor = token.actor;
new Dialog({
    title: 'Level Up',
    content: `<p>Do you wish to level up ${selectedActor.name}?</p> 
                <p><input id="level-up-proportional-healing" type="checkbox" checked /> Use proportional healing?</p>`,
    buttons: {
        yes: {
            icon: '<i class = "fas fa-check"></i>',
            label: 'Level Up',
            callback: () => levelUp(selectedActor, document.getElementById("level-up-proportional-healing").checked),
        },
        no: {
            icon: '<i class = "fas fa-times"></i>',
            label: 'Cancel'
        },
    },
    default: 'yes',
}).render(true)
}