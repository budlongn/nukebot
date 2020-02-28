export interface Character {
    id: number
    name: string
    gender: TypeNameObject
    faction: TypeNameObject
    race: Race
    character_class: CharacterClass
    active_spec: Spec
    realm: Realm
    guild: Guild
    level: number
    experience: number
    achievement_points: number
    raids: Raids
}

export interface Race {
    id: RaceEnum
    name: LocalizedNames
}

export interface CharacterClass {
    id: Class
    name: LocalizedNames
}

export interface LocalizedNames {
    en_US: string
    es_MX: string
    pt_BR: string
    de_DE: string
    en_GB: string
    es_ES: string
    fr_FR: string
    it_IT: string
    ru_RU: string
    ko_KR: string
    zh_TW: string
    zh_CN: string
}

export interface Raids {
    expansion: Expansion
    instances: Instance[]
}

export interface Expansion {
    id: Expansions
    name: string
}

export interface Instance {
    instance: {
        id: number
        name: string
    }
    modes: Mode[]
}

export interface Mode {
    difficulty: TypeNameObject
    status: TypeNameObject
    progress: Progress
}

export interface Progress {
    completed_count: number
    total_count: number
    encounters: Encounter[]
}

export interface Encounter {
    encounter: {
        id: number
        name: string
    }
    completed_count: number
    last_kill_timestamp: number
}

export interface Boss {
    id: number
    name: string
    lfrKills: number
    lfrTimestamp: number
    normalKills: number
    normalTimestamp: number
    heroicKills: number
    heroicTimestamp: number
    mythicKills: number
    mythicTimestamp: number
}

export interface Talents {
    selected: boolean
    talents: Talent[]
    spec: Spec
}

export interface Talent {
    tier: number
    column: number
    spell: Spell
    spec?: Spec
    calcTalent: string
    calcSpec: string
}

export interface Spell {
    id: number
    name: string
    icon: string
    description: string
    range: string
    castTime: string,
    cooldown: string
}

export interface Spec {
    id: Specialization
    name: LocalizedNames
}

export interface Realm extends IdNameObject {
    slug: string
}

export interface Guild {
    id: number
    name: string
    realm: Realm
    faction: TypeNameObject
}

export enum Class {
    None,
    Warrior,
    Paladin,
    Hunter,
    Rogue,
    Priest,
    DeathKnight,
    Shaman,
    Mage,
    Warlock,
    Monk,
    Druid,
    DemonHunter,
}

export enum RaceEnum {
    Human = 1,
    Orc,
    Dwarf,
    NightElf,
    Undead,
    Tauren,
    Gnome,
    Troll,
    Goblin,
    BloodElf,
    Draenai,
    FelOrc,
    Naga,
    Broken,
    Skeleton,
    Vrykul,
    Tuskarr,
    ForestTroll,
    Taunka,
    NorthrendSkeleton,
    IceTroll,
    Worgen,
    Gilnean,
    NeutralPandaren,
    AlliancePandaren,
    HordePandaren,
    Nightbourne,
    HighmountainTauren,
    VoidElf,
    LightforgedDraenai,
    ZandalariTroll,
    KulTiran,
    ThinHuman,
    DarkIronDwarf,
    Vulpera,
    MagharOrc,
    Mechagnome //gross
}

export enum Specialization {
    Arcane = 62,
    Fire = 63,
    FrostMage = 64,
    HolyPaladin = 65,
    ProtectionPaladin = 66,
    Retribution = 70,
    Arms = 71,
    Fury = 72,
    ProtectionWarrior = 73,
    Balance = 102,
    Feral = 103,
    Guardian = 104,
    RestorationDruid = 105,
    Blood = 250,
    FrostDK = 251,
    Unholy = 252,
    BeastMastery = 253,
    Marksmanship = 254,
    Survival = 255,
    Discipline = 256,
    HolyPriest = 257,
    Shadow = 258,
    Assassination = 259,
    Outlaw = 260,
    Subtlety = 261,
    Elemental = 262,
    Enhancement = 263,
    RestorationShaman = 264,
    Affliction = 265,
    Demonology = 266,
    Destruction = 267,
    Brewmaster = 268,
    Windwalker = 269,
    Mistweaver = 270,
    Havoc = 577,
    Vengeance = 581
}

export enum Expansions {
    Classic = 68,
    BurningCrusade = 70,
    WrathOfTheLichKing = 72,
    Cataclysm = 73,
    MistsOfPandaria = 74,
    WarlordsOfDraenor = 124,
    Legion = 395,
    BattleForAzeroth = 396
}

export interface Items {
    averageItemLevel: number,
    averageItemLevelEquipped: number,
    head: Item
    neck: Item
    shoulder: Item
    back: Item
    chest: Item
    tabard: Item
    wrist: Item
    hands: Item
    waist: Item
    legs: Item
    feet: Item
    finger1: Item
    finger2: Item
    trinket1: Item
    trinket2: Item
    mainHand: Item
    offHand: Item
}

//TODO: Clean this up, holy hell
export interface Item {
    item: {
        id: number
    }
    slot: TypeNameObject
    quantity: number
    context: number
    bonus_list: number[]
    quality: TypeNameObject
    name: LocalizedNames
    azerite_details: AzeriteDetails
    item_class: IdNameObject
    item_subclass: IdNameObject
    inventory_type: TypeNameObject
    binding: TypeNameObject
    unique_equipped: LocalizedNames
    stats: Stat[]
    spells: {
        spell: IdNameObject
        description: LocalizedNames
    }[]
    requirements: {
        level: {
            value: number
            display_string: LocalizedNames
        }
    }
    description: LocalizedNames
    level: {
        value: number
        display_string: LocalizedNames
    }
    is_subclass_hidden: boolean
}

export interface AzeriteDetails {
    percentage_to_next_level: number
    selected_essences: Essence[]
    level: {
        value: number
        display_string: LocalizedNames
    }
}

export interface Essence {
    slot: number
    rank: number
    main_spell_tooltip: SpellTooltip
    passive_spell_tooltip: SpellTooltip
    essence: IdNameObject
}

export interface SpellTooltip {
    spell: IdNameObject
    description: LocalizedNames
    cast_time: LocalizedNames
    cooldown: LocalizedNames
}

export interface IdNameObject {
    id: number
    name: LocalizedNames
}

export interface TypeNameObject {
    type: string
    name: LocalizedNames
}

export interface TooltipParams {
    transmogItem: number
    timewalkerLevel: number
    azeritePower0: number
    azeritePower1: number
    azeritePower2: number
    azeritePower3: number
    azeritePower4: number
    azeritePowerLevel: number
}

export interface Appearance {
    itemId: number
    itemAppearanceModId: number
    transmogItemAppearanceModId: number
}

export interface Stat {
    type: TypeNameObject
    value: number
    display: {
        displayString: LocalizedNames
        color: {
            r: number
            g: number
            b: number
            a: number
        }
    }
}

export interface AzeriteEmpoweredItem {
    azeritePowers: AzeritePower[]
}

export interface AzeritePower {
    id: number
    tier: number
    spellId: number
    bonusListId: number
}

export interface AzeriteItem {
    azeriteLevel: number
    azeriteExperience: number
    azeriteExperienceRemaining: number
}