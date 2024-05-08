const characters = [
	{ id: 1011334, name: "3-D Man", description: "" },
	{
		id: 1017100,
		name: "A-Bomb (HAS)",
		description:
			"Rick Jones has been Hulk's best bud since day one,…ses it like a giant bowling ball of destruction! ",
	},
	{
		id: 1009144,
		name: "A.I.M.",
		description:
			"AIM is a terrorist organization bent on destroying the world.",
	},
	{ id: 1010699, name: "Aaron Stack", description: "" },
	{
		id: 1009146,
		name: "Abomination (Emil Blonsky)",
		description:
			"Formerly known as Emil Blonsky, a spy of Soviet Yu…ransformed Bruce Banner into the incredible Hulk.",
	},
	{ id: 1016823, name: "Abomination (Ultimate)", description: "" },
	{ id: 1009148, name: "Absorbing Man", description: "" },
	{ id: 1009149, name: "Abyss", description: "" },
	{ id: 1010903, name: "Abyss (Age of Apocalypse)", description: "" },
	{ id: 1011266, name: "Adam Destine", description: "" },
	{
		id: 1010354,
		name: "Adam Warlock",
		description:
			"Adam Warlock is an artificially created human who …ocoon at a scientific complex called The Beehive.",
	},
	{ id: 1010846, name: "Aegis (Trey Rollins)", description: "" },
	{ id: 1017851, name: "Aero (Aero)", description: "" },
	{ id: 1012717, name: "Agatha Harkness", description: "" },
	{ id: 1011297, name: "Agent Brand", description: "" },
	{
		id: 1011031,
		name: "Agent X (Nijo)",
		description:
			"Originally a partner of the mind-altering assassin…inds crime family, which included Nijo's brother.",
	},
	{ id: 1009150, name: "Agent Zero", description: "" },
	{ id: 1011198, name: "Agents of Atlas", description: "" },
	{ id: 1011175, name: "Aginar", description: "" },
	{ id: 1011136, name: "Air-Walker (Gabriel Lan)", description: "" },
];
let characterIdMapping: { [name: string]: number } = {};

// Populate the mapping using the characters array
characters.forEach((character) => {
	characterIdMapping[character.name] = character.id;
});

// Export the character ID mapping
export { characterIdMapping };
