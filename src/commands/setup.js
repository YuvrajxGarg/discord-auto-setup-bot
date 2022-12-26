const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, Events, StringSelectMenuBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("create amazing server setups in few clicks")
    ,
    
    run: async (client, interaction) => {

        /// select menu options for main menu
        const row1 = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('mainsetup')
					.setPlaceholder('Click here to select a Setup')
					.addOptions(
						{
							label: 'Reaction Roles Setup',
							description: 'Runs a process to setup Reaction Roles',
							value: 'react_roles',
						},
						{
							label: 'Rules Message Setup',
							description: 'Runs a process to setup a Rules Message',
							value: 'rules_msg',
						},
					),
			);

             /// select menu options for main menu
        const row2 = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('rolemenu')
                .setPlaceholder('Click here to select type of role selector message')
                .addOptions(
                    {
                        label: 'Age Selector Message',
                        description: 'Runs a process to setup Age role select setup',
                        value: 'age_roles',
                    },
                    {
                        label: 'Gender Selector Message',
                        description: 'Runs a process to setup Gender role select setup',
                        value: 'gender_roles',
                    },
                ),
        );

            

            //// MAIN SETUP EMBED
        const setupembed = new EmbedBuilder()
        .setTitle("The Ultimate Discord Setup System")
        .setColor('#303434')
        .setDescription('> Choose from the menu below what you want to create!')

        ///// ROLE EMBED
        const rolembed = new EmbedBuilder()
        .setTitle("Reaction Role Setup System")
        .setColor('#303434')
        .setDescription('> test')

        //// RULES MESSAGE EMBED
        const rulesembed = new EmbedBuilder()
        .setTitle("Rules Message Setup System")
        .setColor('#303434')
        .setDescription('> test')
       // reply with main embed
        let msg = await interaction.reply({embeds: [setupembed],components: [row1]})

        //sending selected replies
        const filter = (interaction) =>
        interaction.isStringSelectMenu()
        const collector = interaction.channel.createMessageComponentCollector({
            filter, time: 60000, dispose: true
            
        })
        collector.on('collect', async(collected) => {
            const value = collected.values[0];
                 
            
                 if(value === "rules_msg") {
                    collected.deferUpdate();

                  await interaction.channel.send({embeds: [rulesembed]})
            
            
            }
            if(value === "react_roles") {
                collected.deferUpdate();

                  await interaction.channel.send({embeds: [rolembed], components: [row2]})
            }
         })






         const filter2 = (interaction) =>
         interaction.isStringSelectMenu()
         const collector2 = interaction.channel.createMessageComponentCollector({
             filter, time: 60000, dispose: true
             
         })
         collector2.on('collect', async(collected2) => {
             const value = collected2.values[0];
                  
             
                  if(value === "age_roles") {
                    const ageroleembed = new EmbedBuilder()
                    .setTitle('Select your AGE')
                    .setDescription('ok')
                    .setColor('#303434')


                     collected2.deferUpdate();
 
                   await interaction.channel.send({embeds: [ageroleembed]})
             
             
             }
            /* if(value === "react_roles") {
                
                 collected2.deferUpdate();
 
                   await interaction.channel.send({embeds: [], components: [row2]})
             }*/
          })



         

          
  
 }
}
