// ===================== 全局配置 =====================
const CONFIG = {
  grade_order: ["white", "blue", "purple", "red", "gold"],
  grade_name: {white:"白色",blue:"蓝色",purple:"紫色",red:"红色",gold:"金色"},
  gradeColor: {white:"grade-white",blue:"grade-blue",purple:"grade-purple",red:"grade-red",gold:"grade-gold"},
  style_name: {taiji:"太极",huashan:"剑法",bang:"棍掌",xingxiu:"毒器",xiaoyao:"逍遥掌",gumu:"玉女剑",shaolin:"少林",quanzhen:"全真",taohua:"落英",other:"通用"},
  scrollNeed: {white:5,blue:10,purple:20,red:35,gold:50},

  // 状态类型: dot 持续扣血 / dot_mp 持续扣内 / dot_both 血内双扣 /
  // debuff 减益 / buff 增益 / instant 命中即触发的即时效果
  state_def: {
    bleed:            {name:"流血",     desc:"每回合扣血并降低防御",     dmg:10, mpDmg:0, type:"dot",       defDown:0.15},
    poison:           {name:"蚀骨毒",  desc:"毒素持续侵蚀气血",         dmg:13, mpDmg:0, type:"dot"},
    internal_injury:  {name:"内伤",    desc:"每回合扣内力，攻防受损",   dmg:0,  mpDmg:7, type:"dot_mp", atkDown:0.1},
    cold_poison:      {name:"寒毒",    desc:"同时扣血+扣内力",          dmg:9,  mpDmg:5, type:"dot_both"},
    rebound:          {name:"卸力反弹",desc:"反弹敌方40%攻击伤害",      type:"buff", reflect:0.4},
    rebound_up:       {name:"反弹增幅",desc:"反弹比例提升至65%",        type:"buff", reflect:0.65},
    slow_qi:          {name:"滞气",    desc:"攻击降低，集气变慢",       type:"debuff", atkDown:0.15, qiDown:0.2},
    slow:             {name:"寒劲迟滞", desc:"身法迟缓，攻击略降",       type:"debuff", atkDown:0.08},
    seal_weapon:      {name:"封兵刃",   desc:"不能使用兵刃类武学",       type:"debuff", seal:"weapon"},
    seal_skill:       {name:"封武学",   desc:"随机招式被封印",           type:"debuff", seal:"skill"},
    seal_atk:         {name:"封普攻",   desc:"短暂锁脉，无法普攻",       type:"debuff", seal:"attack"},
    break_def:       {name:"破防",     desc:"防御大幅降低",             type:"debuff", defDown:0.3},
    atk_down:         {name:"攻乏",     desc:"攻击力下降",               type:"debuff", atkDown:0.12},
    poison_lock_mp:   {name:"封内",     desc:"封禁内力自然回复",         type:"debuff", lockMp:true},
    steal_mp:         {name:"夺内",     desc:"命中偷取敌方内力",         type:"instant", stealMp:10},
    combo:            {name:"连击",     desc:"追加一段连击伤害",         type:"instant", comboHits:1},
    combo_up:         {name:"蓄势",     desc:"下一招连击概率提升",       type:"buff", comboBonus:0.3},
    def_up:           {name:"金钟护体", desc:"自身防御提升",             type:"buff", defUp:0.2},
    self_def:         {name:"伏魔护身", desc:"自身减伤提升",             type:"buff", defUp:0.15},
    purify:           {name:"净化",     desc:"清除自身负面状态",         type:"instant", purify:"all"},
    purify_one:       {name:"涤秽",     desc:"清除自身一个负面状态",     type:"instant", purify:"one"},
    purify_low:       {name:"正气驱散", desc:"驱散弱负面状态",           type:"instant", purify:"one"},
    heal:             {name:"疗伤",     desc:"恢复自身气血",             type:"instant", heal:0.15},
    heal_up:          {name:"自愈",     desc:"持续回复气血",             type:"buff", healRegen:0.05},
    mp_regen:         {name:"内息",     desc:"持续回复内力",             type:"buff", mpRegen:0.08},
    anti_cold:        {name:"阳躯",     desc:"免疫寒毒",                 type:"buff", antiCold:true},
    dmg_vs_poison:    {name:"诛邪",     desc:"对中毒目标增伤",           type:"instant", vsPoison:0.25},
    self_hurt_dmg:    {name:"舍身",     desc:"自损气血换取爆发",         type:"instant", selfCost:0.08, dmgBonus:0.4},
    stable_dmg:       {name:"稳击",     desc:"伤害稳定浮动减小",         type:"buff", stable:true},
    illusion:         {name:"幻术",     desc:"概率闪避敌方攻击",         type:"buff", dodge:0.2},
    light_shock:      {name:"震伤",     desc:"轻微外伤持续耗血",         type:"dot", dmg:6, mpDmg:0},
    poison_delay_injury: {name:"迟发毒伤", desc:"数回合后爆发内伤",      type:"debuff", delayedInjury:true},
    charge_dmg:       {name:"蓄力重击", desc:"攻击力临时提升",           type:"buff", atkUp:0.25},
    copy_skill:       {name:"变招",     desc:"复刻补刀，追加一段伤害",   type:"instant", comboHits:1},
    heal_team:        {name:"团队续航", desc:"持续回复气血",             type:"buff", healRegen:0.05},
    atk_def_up:       {name:"阵法加持", desc:"攻防同步提升",             type:"buff", atkUp:0.15, defUp:0.15},
    purify_heal_team: {name:"先天正气", desc:"净化自身并回复气血",       type:"instant", purify:"all", heal:0.1},
    purify_poison:    {name:"纯阳驱毒", desc:"清除身上毒类状态",         type:"instant", purify:"poison"},
    all_round:        {name:"九阴归元", desc:"攻防均衡提升",             type:"buff", atkUp:0.1, defUp:0.1}
  },

  // 旧配置里的叠加类/同义状态 → 映射到基础状态（叠加层数由代码维护）
  state_alias: {
    bleed_stack: "bleed",
    poison_stack: "poison",
    internal_injury_stack: "internal_injury",
    internal_injury_multi: "internal_injury",
    rebound_team: "rebound_up"
  },

  dungeon_list: [
    {level_min:1,level_max:10,name:"山间匪寨",enemy:"山匪",hp:180,dropGrade:["white"],desc:"基础残页、低级药材"},
    {level_min:11,level_max:20,name:"毒蛇谷秘境",enemy:"毒蛇妖",hp:260,dropGrade:["white","blue"],desc:"毒功残页、解毒草"},
    {level_min:21,level_max:30,name:"废弃武馆",enemy:"武馆教头",hp:340,dropGrade:["blue"],desc:"武当、全真基础武学"},
    {level_min:31,level_max:40,name:"丐帮分舵之乱",enemy:"叛帮弟子",hp:420,dropGrade:["blue","purple"],desc:"丐帮棍法掌法残页"},
    {level_min:41,level_max:50,name:"华山思过崖",enemy:"剑宗弟子",hp:500,dropGrade:["purple"],desc:"华山剑法残页"},
    {level_min:51,level_max:60,name:"少林罗汉阵",enemy:"罗汉守僧",hp:580,dropGrade:["purple","red"],desc:"少林内功残页"},
    {level_min:61,level_max:70,name:"武当纯阳台",enemy:"武当守道",hp:660,dropGrade:["red"],desc:"太极武学残页"},
    {level_min:71,level_max:80,name:"桃花岛幻境",enemy:"桃花岛影卫",hp:740,dropGrade:["red","gold"],desc:"弹指、奇门残页"},
    {level_min:81,level_max:90,name:"西域绝情谷",enemy:"谷中厉鬼",hp:820,dropGrade:["gold"],desc:"古墓高阶武学"},
    {level_min:91,level_max:100,name:"四绝试炼殿",enemy:"试炼虚影",hp:950,dropGrade:["gold"],desc:"顶级绝学残页"}
  ],

  quest_npc: [
    {
      id:"xiaohe",name:"阿和",intro:"流浪少年，略懂拳脚，性子朴实。",
      atk:10,def:5,hp:160,skill:"简易拳脚",
      needGold:80,minLv:3,
      successRate:0.7,
      refuseText:"多谢少侠好意，我还想独自游历江湖。"
    },
    {
      id:"suxin",name:"苏欣",intro:"采药女子，精通疗伤草药。",
      atk:7,def:8,hp:200,skill:"百草疗伤",
      needGold:150,minLv:8,
      successRate:0.6,
      refuseText:"我习惯独自行走山林，不便相伴。"
    },
    {
      id:"yeling",name:"叶灵",intro:"独行剑客，剑法轻盈。",
      atk:22,def:6,hp:180,skill:"流云剑",
      needGold:300,minLv:15,
      successRate:0.5,
      refuseText:"我的路，只能一个人走。"
    },
    {
      id:"laowu",name:"武僧",intro:"云游僧人，金刚护体。",
      atk:14,def:18,hp:280,skill:"罗汉拳",
      needGold:450,minLv:22,
      successRate:0.55,
      refuseText:"贫僧尚有修行，不便同行。"
    },
    {
      id:"qiaoyin",name:"乔音",intro:"桃花岛旁的乐女，音律扰敌。",
      atk:18,def:10,hp:210,skill:"清音扰神",
      needGold:600,minLv:30,
      successRate:0.45,
      refuseText:"江湖漂泊，我一人足矣。"
    }
  ],

  // 专精分支：隐士授艺三选一
  spec_def: {
    anqi:     {name:"暗器之道", desc:"针、镖、飞刀、弹石等暗器招式增伤 15%"},
    du:       {name:"毒术专精", desc:"毒系招式增伤 15%，蚀毒更烈"},
    quanjiao: {name:"拳脚功夫", desc:"掌、拳、指、爪等近身搏击增伤 15%"}
  },

  herb_list: [
    {name:"回血草",grade:"white",effect:"heal",val:60,price:20,desc:"恢复60气血"},
    {name:"凝神花",grade:"blue",effect:"mp",val:40,price:40,desc:"恢复40内力"},
    {name:"清毒草",grade:"blue",effect:"purify",val:0,price:50,desc:"清除身上所有负面debuff"},
    {name:"大还丹",grade:"gold",effect:"healAll",val:0,price:300,desc:"满血满内，清除debuff"}
  ],

  // 装备池：slot=weapon兵刃/暗器 | armor防具；style=适配套路（匹配出招套路有额外加成）
  // 仅 white 品级在商店出售，蓝及以上全部靠副本/BOSS/野外掉落
  equip_pool: [
    // —— 白装（商店有售）——
    {name:"粗布袍",   grade:"white", slot:"armor",  style:"other",   atk:0,  def:4,  price:30},
    {name:"铁剑",     grade:"white", slot:"weapon", style:"huashan", atk:6,  def:0,  price:40},
    {name:"白木棍",   grade:"white", slot:"weapon", style:"bang",    atk:5,  def:1,  price:35},
    // —— 蓝装（掉落）——
    {name:"青布劲装", grade:"blue",  slot:"armor",  style:"other",   atk:2,  def:10},
    {name:"青钢长剑", grade:"blue",  slot:"weapon", style:"huashan", atk:10, def:1},
    {name:"齐眉棍",   grade:"blue",  slot:"weapon", style:"bang",    atk:10, def:1},
    {name:"淬毒飞刀", grade:"blue",  slot:"weapon", style:"xingxiu", atk:9,  def:0},
    // —— 紫装（掉落）——
    {name:"精钢长剑", grade:"purple",slot:"weapon", style:"huashan", atk:14, def:2},
    {name:"打狗棒",   grade:"purple",slot:"weapon", style:"bang",    atk:15, def:2},
    {name:"铁掌套",   grade:"purple",slot:"weapon", style:"xiaoyao", atk:13, def:3},
    {name:"软猬宝甲", grade:"purple",slot:"armor",  style:"other",   atk:3,  def:16},
    {name:"蝎尾银针", grade:"purple",slot:"weapon", style:"xingxiu", atk:14, def:1},
    // —— 红装（掉落）——
    {name:"金丝宝甲", grade:"red",   slot:"armor",  style:"other",   atk:4,  def:22},
    {name:"太极长剑", grade:"red",   slot:"weapon", style:"taiji",    atk:20, def:3},
    {name:"落英神剑", grade:"red",   slot:"weapon", style:"taohua",  atk:21, def:2},
    {name:"淑女剑",   grade:"red",   slot:"weapon", style:"gumu",     atk:20, def:3},
    {name:"伏魔禅杖", grade:"red",   slot:"weapon", style:"shaolin", atk:19, def:4},
    // —— 金装（BOSS/顶级副本掉落）——
    {name:"玄铁重剑", grade:"gold",  slot:"weapon", style:"huashan", atk:28, def:6},
    {name:"倚天剑",   grade:"gold",  slot:"weapon", style:"taohua",  atk:30, def:5},
    {name:"镇帮打狗棒",grade:"gold", slot:"weapon", style:"bang",    atk:29, def:5},
    {name:"天蚕宝衣", grade:"gold",  slot:"armor",  style:"other",   atk:6,  def:30},
    {name:"含沙射影", grade:"gold",  slot:"weapon", style:"xingxiu", atk:27, def:4},
    {name:"真武荡魔剑",grade:"gold", slot:"weapon", style:"taiji",    atk:27, def:6},
    {name:"逍遥御风扇",grade:"gold", slot:"weapon", style:"xiaoyao",  atk:26, def:5},
    {name:"冰魄寒玉剑",grade:"gold", slot:"weapon", style:"gumu",     atk:27, def:5},
    {name:"金刚降魔杵",grade:"gold", slot:"weapon", style:"shaolin", atk:26, def:6},
    {name:"天罡北斗剑",grade:"gold", slot:"weapon", style:"quanzhen",atk:27, def:5}
  ],

  neigong_def: {
    "武当心法":{atk:2,def:5,mpRegen:2,passiveDef:2},
    "太极神功":{atk:5,def:12,mpRegen:4,passiveDef:5},
    "纯阳无极功":{atk:10,def:20,mpRegen:7,passiveDef:10},
    "华山心法":{atk:4,def:3,mpRegen:2,passiveAtk:2},
    "紫霞神功":{atk:9,def:8,mpRegen:5,passiveAtk:4},
    "丐帮心法":{atk:3,def:4,mpRegen:2,passiveDef:3},
    "降龙心法":{atk:8,def:10,mpRegen:4,passiveDef:6},
    "星宿心法":{atk:4,def:2,mpRegen:3,passiveAtk:3},
    "星宿毒经":{atk:7,def:6,mpRegen:6,passiveAtk:5},
    "逍遥心法":{atk:3,def:3,mpRegen:4,passiveMpRegen:2},
    "八荒六合唯我独尊功":{atk:8,def:9,mpRegen:7,passiveMpRegen:4},
    "北冥神功":{atk:12,def:12,mpRegen:10,passiveMpRegen:6},
    "古墓心法":{atk:4,def:3,mpRegen:2,passiveAtk:2},
    "玉女心经":{atk:11,def:11,mpRegen:6,passiveAtk:5},
    "少林心法":{atk:2,def:6,mpRegen:2,passiveDef:4},
    "少林九阳功":{atk:6,def:14,mpRegen:5,passiveDef:7},
    "易筋经":{atk:9,def:22,mpRegen:8,passiveDef:12},
    "全真心法":{atk:2,def:5,mpRegen:3,passiveDef:3},
    "先天功":{atk:10,def:15,mpRegen:8,passiveDef:8},
    "桃花岛心法":{atk:4,def:4,mpRegen:3,passiveAtk:3},
    "桃花奇门心法":{atk:8,def:8,mpRegen:6,passiveAtk:6}
  },
  qinggong_def: {
    "梯云纵":{qiSpeed:1.2},
    "华山身法":{qiSpeed:1.05},
    "逍遥游":{qiSpeed:1.15},
    "摘星功":{qiSpeed:1.08},
    "凌波微步":{qiSpeed:1.4},
    "古墓轻功":{qiSpeed:1.12},
    "少林轻身功":{qiSpeed:1.02},
    "金雁功":{qiSpeed:1.10},
    "瞬息千里":{qiSpeed:1.18}
  },

  school_list: [
    {school:"武当派",core_tag:["rebound","slow_qi"],intro:"以柔克刚、后发先至，擅长卸力反弹、滞气封招",
      neigong:[{name:"武当心法",grade:"white"},{name:"太极神功",grade:"purple"},{name:"纯阳无极功",grade:"gold"}],
      qinggong:[{name:"梯云纵",grade:"red"}],
      wugong:[
        {name:"绵掌",grade:"white",mpCost:8,range:"single",state:"atk_down",style:"taiji",desc:"柔劲缠打，小幅降低敌方攻击力"},
        {name:"柔云剑法",grade:"blue",mpCost:12,range:"smallcross",state:"slow_qi",style:"taiji",desc:"缠剑滞劲，降低敌方集气速度"},
        {name:"绕指柔剑",grade:"purple",mpCost:18,range:"fan",state:"seal_weapon",style:"taiji",desc:"连绵缠击，概率封敌方兵刃招式"},
        {name:"两仪剑法",grade:"purple",mpCost:20,range:"line2",state:"rebound_up",style:"taiji",desc:"双人同使，卸力反弹概率大幅上涨"},
        {name:"太极拳",grade:"red",mpCost:24,range:"bigcross",state:"rebound",style:"taiji",desc:"核心反弹，敌方攻势越猛，反弹伤害越高"},
        {name:"神门十三剑",grade:"red",mpCost:22,range:"longline",state:"seal_weapon",style:"taiji",desc:"专封各类兵刃武学"},
        {name:"太极剑·如封似闭",grade:"gold",mpCost:30,range:"longline",state:"slow_qi",style:"taiji",desc:"剑意循环，持续削减目标集气"},
        {name:"真武七截阵",grade:"gold",mpCost:36,range:"halfscreen",state:"rebound_team",style:"taiji",desc:"多名武当弟子同场，全队反弹增幅"}
      ]},
    {school:"华山派",core_tag:["bleed","combo"],intro:"剑宗重身法破招快剑，擅长流血破甲、连击",
      neigong:[{name:"华山心法",grade:"white"},{name:"紫霞神功",grade:"red"}],
      qinggong:[{name:"华山身法",grade:"blue"}],
      wugong:[
        {name:"白虹贯日",grade:"white",mpCost:7,range:"single",state:"bleed",style:"huashan",desc:"锋刃割裂，低概率流血"},
        {name:"苍松迎客",grade:"blue",mpCost:11,range:"line2",state:"combo_up",style:"huashan",desc:"剑势连贯，小幅提升下一招连击概率"},
        {name:"无边落木剑",grade:"blue",mpCost:13,range:"smallcross",state:"bleed_stack",style:"huashan",desc:"多段轻击，叠加流血层数"},
        {name:"太岳三青峰",grade:"purple",mpCost:17,range:"fan",state:"bleed",style:"huashan",desc:"破甲斩击，高概率施加流血"},
        {name:"希夷剑",grade:"purple",mpCost:19,range:"single",state:"bleed",style:"huashan",desc:"蓄满后必触发流血，破格挡"},
        {name:"风送紫霞剑",grade:"red",mpCost:23,range:"single",state:"charge_dmg",style:"huashan",desc:"气宗重剑，蓄力完成高额伤害"},
        {name:"玉女剑连环",grade:"red",mpCost:21,range:"line2",state:"combo",style:"huashan",desc:"三段连击，每一段都可叠加流血"},
        {name:"独孤九剑·破剑式",grade:"gold",mpCost:32,range:"longline",state:"bleed,break_def",style:"huashan",desc:"无视格挡、破招，必施加深度流血"}
      ]},
    {school:"丐帮",core_tag:["internal_injury"],intro:"天下第一大帮，掌劲雄浑，震荡脏腑，主打内伤",
      neigong:[{name:"丐帮心法",grade:"white"},{name:"降龙心法",grade:"red"}],
      qinggong:[{name:"逍遥游",grade:"purple"}],
      wugong:[
        {name:"缠丝擒拿手",grade:"white",mpCost:7,range:"single",state:"slow_qi",style:"bang",desc:"锁脉扣筋，小幅延缓敌方集气"},
        {name:"逍遥游掌",grade:"blue",mpCost:11,range:"smallcross",state:"internal_injury",style:"bang",desc:"掌劲震荡，低概率内伤"},
        {name:"锁喉擒拿手",grade:"blue",mpCost:10,range:"single",state:"seal_atk",style:"bang",desc:"封敌方普攻，短暂锁脉"},
        {name:"盘龙棍法",grade:"purple",mpCost:16,range:"bigcross",state:"internal_injury",style:"bang",desc:"棍风震荡，群体内伤判定"},
        {name:"奇门打狗棍",grade:"purple",mpCost:18,range:"fan",state:"internal_injury_stack",style:"bang",desc:"多段棍击，叠加重内伤"},
        {name:"打狗棒法·缠字诀",grade:"red",mpCost:22,range:"fan",state:"seal_skill,internal_injury",style:"bang",desc:"概率封印敌方武学，附带内伤震荡"},
        {name:"降龙十八掌·亢龙有悔",grade:"gold",mpCost:34,range:"halfscreen",state:"internal_injury",style:"bang",desc:"雄浑内劲透体，大概率重创内伤"}
      ]},
    {school:"星宿派",core_tag:["poison"],intro:"邪派毒宗，蚀髓消内，多层蚀骨毒压制内力回复",
      neigong:[{name:"星宿心法",grade:"white"},{name:"星宿毒经",grade:"red"}],
      qinggong:[{name:"摘星功",grade:"blue"}],
      wugong:[
        {name:"星宿搜骨拳",grade:"white",mpCost:6,range:"single",state:"poison",style:"xingxiu",desc:"浅层腐毒，缓慢掉血"},
        {name:"蝎尾针",grade:"blue",mpCost:10,range:"line2",state:"poison",style:"xingxiu",desc:"淬毒飞针，施加蚀骨毒"},
        {name:"碧磷针",grade:"blue",mpCost:12,range:"smallcross",state:"poison",style:"xingxiu",desc:"群体弱毒，持续耗血"},
        {name:"抽髓掌",grade:"purple",mpCost:17,range:"single",state:"poison_stack",style:"xingxiu",desc:"快速叠毒，毒素侵蚀内力"},
        {name:"化骨绵掌",grade:"purple",mpCost:19,range:"fan",state:"poison",style:"xingxiu",desc:"剧毒入体，持续腐蚀气血"},
        {name:"三笑逍遥散",grade:"red",mpCost:23,range:"single",state:"poison_delay_injury",style:"xingxiu",desc:"迟发性内伤毒，数回合后爆发重创"},
        {name:"化功大法",grade:"gold",mpCost:31,range:"bigcross",state:"poison_lock_mp",style:"xingxiu",desc:"蚀毒侵入经脉，封禁敌方内力回复"}
      ]},
    {school:"逍遥派",core_tag:["cold_poison","steal_mp","combo"],intro:"飘逸诡变，寒毒偷内、变招连击",
      neigong:[{name:"逍遥心法",grade:"white"},{name:"八荒六合唯我独尊功",grade:"red"},{name:"北冥神功",grade:"gold"}],
      qinggong:[{name:"凌波微步",grade:"gold"}],
      wugong:[
        {name:"逍遥拂云掌",grade:"white",mpCost:8,range:"single",state:"slow",style:"xiaoyao",desc:"寒劲透肤，小幅减速"},
        {name:"寒袖拂穴",grade:"blue",mpCost:11,range:"single",state:"seal_skill",style:"xiaoyao",desc:"点穴麻痹，短暂封招"},
        {name:"天山六阳掌",grade:"purple",mpCost:18,range:"fan",state:"cold_poison,steal_mp",style:"xiaoyao",desc:"寒劲伤体，命中偷取内力"},
        {name:"天山折梅手",grade:"red",mpCost:24,range:"bigcross",state:"combo,copy_skill",style:"xiaoyao",desc:"变招连击，复刻敌方低品级招式"},
        {name:"白虹掌力",grade:"red",mpCost:22,range:"longline",state:"cold_poison,steal_mp",style:"xiaoyao",desc:"无形寒劲，远距离偷内"},
        {name:"生死符",grade:"gold",mpCost:35,range:"fullscreen",state:"cold_poison",style:"xiaoyao",desc:"寒冰蚀脉，持续掉血掉内"}
      ]},
    {school:"古墓派",core_tag:["bleed"],intro:"林朝英所创，阴柔锋刃，双人联动，阴寒流血",
      neigong:[{name:"古墓心法",grade:"white"},{name:"玉女心经",grade:"gold"}],
      qinggong:[{name:"古墓轻功",grade:"purple"}],
      wugong:[
        {name:"天罗地网势",grade:"white",mpCost:7,range:"single",state:"bleed",style:"gumu",desc:"绵密掌风，划裂皮肉，低概率流血"},
        {name:"美女拳法",grade:"blue",mpCost:11,range:"smallcross",state:"bleed_stack",style:"gumu",desc:"阴柔巧劲，叠加流血"},
        {name:"玉女剑法",grade:"purple",mpCost:17,range:"longline",state:"bleed",style:"gumu",desc:"剑刃阴寒，稳定流血"},
        {name:"玉女素心剑法",grade:"red",mpCost:23,range:"fan",state:"combo,bleed_stack",style:"gumu",desc:"双人联动，连击段数翻倍，流血暴涨"},
        {name:"黯然销魂掌",grade:"gold",mpCost:33,range:"longline",state:"bleed,internal_injury",style:"gumu",desc:"自身状态越差威力越强，流血+内伤双判定"}
      ]},
    {school:"少林派",core_tag:["internal_injury","purify"],intro:"武林泰山北斗，佛门金刚，擅减伤、净化、震击内伤",
      neigong:[{name:"少林心法",grade:"white"},{name:"少林九阳功",grade:"purple"},{name:"易筋经",grade:"gold"}],
      qinggong:[{name:"少林轻身功",grade:"blue"}],
      wugong:[
        {name:"罗汉短打",grade:"white",mpCost:6,range:"single",state:"light_shock",style:"shaolin",desc:"朴实刚劲，小幅震伤"},
        {name:"罗汉拳",grade:"blue",mpCost:10,range:"line2",state:"internal_injury",style:"shaolin",desc:"佛门刚劲，低概率内伤"},
        {name:"伏魔棍",grade:"blue",mpCost:12,range:"smallcross",state:"dmg_vs_poison",style:"shaolin",desc:"棍扫群邪，对毒系目标增伤"},
        {name:"韦陀掌",grade:"purple",mpCost:16,range:"bigcross",state:"self_def",style:"shaolin",desc:"群伤附带自身减伤buff"},
        {name:"大金刚拳",grade:"purple",mpCost:18,range:"fan",state:"internal_injury",style:"shaolin",desc:"破甲重击，震击内伤"},
        {name:"大力金刚掌",grade:"red",mpCost:22,range:"longline",state:"internal_injury",style:"shaolin",desc:"厚重佛劲，高概率内伤"},
        {name:"千手如来掌",grade:"red",mpCost:24,range:"bigcross",state:"internal_injury_multi",style:"shaolin",desc:"多段连环掌，连续内伤判定"},
        {name:"金刚不坏神功",grade:"gold",mpCost:30,range:"self",state:"purify,def_up",style:"shaolin",desc:"高额减伤，净化自身毒、寒debuff"}
      ]},
    {school:"全真教",core_tag:["purify"],intro:"玄门正宗，主打续航净化，克制各类负面状态",
      neigong:[{name:"全真心法",grade:"white"},{name:"先天功",grade:"gold"}],
      qinggong:[{name:"金雁功",grade:"blue"}],
      wugong:[
        {name:"昊天掌",grade:"white",mpCost:7,range:"single",state:"purify_low",style:"quanzhen",desc:"玄门正气，小幅驱散友方弱debuff"},
        {name:"全真剑法",grade:"blue",mpCost:11,range:"smallcross",state:"purify_one",style:"quanzhen",desc:"剑光涤秽，净化友方一个负面状态"},
        {name:"三花聚顶掌",grade:"purple",mpCost:17,range:"bigcross",state:"stable_dmg",style:"quanzhen",desc:"玄门正气群攻，无debuff，稳定伤害"},
        {name:"七星剑法",grade:"purple",mpCost:19,range:"fan",state:"heal_team",style:"quanzhen",desc:"连环剑势，给队友续续航buff"},
        {name:"同归剑法",grade:"red",mpCost:25,range:"single",state:"self_hurt_dmg",style:"quanzhen",desc:"以自身气血换高额爆发，自损换伤"},
        {name:"天罡北斗阵",grade:"red",mpCost:23,range:"team",state:"atk_def_up",style:"quanzhen",desc:"组队时全队攻防同步上涨"},
        {name:"先天一气掌",grade:"gold",mpCost:32,range:"halfscreen",state:"purify_heal_team",style:"quanzhen",desc:"持续给全队叠加续航、净化光环"}
      ]},
    {school:"桃花岛",core_tag:["combo","slow_qi"],intro:"东邪奇门音律，剑法掌法连绵连击，音律扰神滞气",
      neigong:[{name:"桃花岛心法",grade:"white"},{name:"桃花奇门心法",grade:"red"}],
      qinggong:[{name:"瞬息千里",grade:"purple"}],
      wugong:[
        {name:"落英掌",grade:"white",mpCost:7,range:"single",state:"combo",style:"taohua",desc:"巧劲连击，两段攻击"},
        {name:"旋风扫叶腿",grade:"white",mpCost:6,range:"single",state:"combo",style:"taohua",desc:"腿法连环"},
        {name:"落英神剑掌",grade:"blue",mpCost:11,range:"smallcross",state:"combo",style:"taohua",desc:"掌影纷飞，三段连击"},
        {name:"落英剑法",grade:"blue",mpCost:12,range:"line2",state:"combo",style:"taohua",desc:"剑花连环，连击"},
        {name:"玉箫剑法",grade:"purple",mpCost:18,range:"longline",state:"combo",style:"taohua",desc:"箫剑合一，连绵连击"},
        {name:"弹指神通",grade:"red",mpCost:21,range:"single",state:"break_def",style:"taohua",desc:"真气弹指，高额破防，精准远程"},
        {name:"碧海潮生曲",grade:"gold",mpCost:33,range:"halfscreen",state:"slow_qi,atk_down",style:"taohua",desc:"音律扰神乱气，降低敌方集气、攻击威力"}
      ]}
    ],
    free_wugong: [
      {name:"青字九打",grade:"white",mpCost:6,range:"single",state:"bleed",style:"other",desc:"暗器手法，小概率流血"},
      {name:"寒冰掌",grade:"blue",mpCost:10,range:"line2",state:"slow",style:"other",desc:"寒劲减速"},
      {name:"满天花雨",grade:"purple",mpCost:17,range:"fan",state:"bleed",style:"other",desc:"多段散射暗器，叠加流血"},
      {name:"铁掌功",grade:"purple",mpCost:19,range:"bigcross",state:"internal_injury",style:"other",desc:"刚猛掌劲，内伤判定"},
      {name:"一阳指",grade:"red",mpCost:22,range:"longline",state:"purify_poison,heal",style:"other",desc:"纯阳指劲，破邪毒、疗伤"},
      {name:"九阴白骨爪",grade:"gold",mpCost:30,range:"fan",state:"bleed,poison",style:"other",desc:"九阴外功，流血附带阴毒"},
      {name:"九阳神功",grade:"gold",mpCost:0,range:"self",state:"heal_up,mp_regen,anti_cold",style:"other",desc:"阳刚自愈、增伤、抗寒毒"},
      {name:"九阴真经",grade:"gold",mpCost:0,range:"self",state:"all_round,heal,illusion",style:"other",desc:"攻防均衡，附带阴柔幻术、疗伤"}
    ],

    // 门派师傅配置：教学到出师
    master_def: {
      "武当派":  {name:"张三丰",  title:"武当掌门",   graduateLv:20, graduateSkills:3, rewardGold:300, rewardNeigong:"太极神功",   gradTitle:"武当传人", gradStyle:"taiji",  quote:"柔能克刚，后发先至，你且好生体悟。"},
      "华山派":  {name:"风清扬",  title:"剑宗长老",   graduateLv:20, graduateSkills:3, rewardGold:300, rewardNeigong:"紫霞神功",   gradTitle:"华山剑宗", gradStyle:"huashan",quote:"剑招无招，行云流水，切记。"},
      "丐帮":    {name:"洪七公",  title:"丐帮帮主",   graduateLv:20, graduateSkills:3, rewardGold:300, rewardNeigong:"降龙心法",   gradTitle:"丐帮弟子", gradStyle:"bang",    quote:"侠义为本，掌劲为公，莫要堕了丐帮威名。"},
      "星宿派":  {name:"丁春秋",  title:"星宿老仙",   graduateLv:20, graduateSkills:3, rewardGold:300, rewardNeigong:"星宿毒经",   gradTitle:"星宿门人", gradStyle:"xingxiu",quote:"哈哈哈哈，乖徒儿，把毒功练得炉火纯青。"},
      "逍遥派":  {name:"无崖子",  title:"逍遥掌门",   graduateLv:20, graduateSkills:3, rewardGold:300, rewardNeigong:"八荒六合唯我独尊功", gradTitle:"逍遥客", gradStyle:"xiaoyao", quote:"逍遥天地间，随心而动。"},
      "古墓派":  {name:"林朝英",  title:"古墓祖师",   graduateLv:20, graduateSkills:3, rewardGold:300, rewardNeigong:"玉女心经",   gradTitle:"古墓遗徒", gradStyle:"gumu",   quote:"清寂幽居，剑心玉女，望你持守本心。"},
      "少林派":  {name:"玄慈方丈",title:"少林方丈",   graduateLv:20, graduateSkills:3, rewardGold:300, rewardNeigong:"少林九阳功", gradTitle:"少林俗家", gradStyle:"shaolin", quote:"金刚伏魔，慈悲为怀，善护自身。"},
      "全真教":  {name:"王重阳",  title:"全真祖师",   graduateLv:20, graduateSkills:3, rewardGold:300, rewardNeigong:"先天功",     gradTitle:"全真弟子", gradStyle:"quanzhen",quote:"玄门正气，清净无为，克敌先克己。"},
      "桃花岛":  {name:"黄药师",  title:"东邪",       graduateLv:20, graduateSkills:3, rewardGold:300, rewardNeigong:"桃花奇门心法", gradTitle:"桃花门人", gradStyle:"taohua", quote:"奇门遁甲，落英缤纷，你可有几分悟性？"}
    },

    // 金庸原著 BOSS（精英/挑战）
    boss_list: [
      {name:"梅超风",  lv:18, hp:320,  atk:26, def:8,  skill:"九阴白骨爪", state:"bleed,poison",        dropGrade:["blue","purple"], desc:"黑风双煞之一，爪阴毒狠辣"},
      {name:"欧阳克",  lv:28, hp:430,  atk:34, def:12, skill:"灵蛇拳",     state:"slow_qi",             dropGrade:["purple"],        desc:"白驼山少主，拳势如蛇"},
      {name:"鸠摩智",  lv:45, hp:620,  atk:48, def:18, skill:"火焰刀",     state:"internal_injury",      dropGrade:["purple","red"],  desc:"吐蕃国师，火焰刀凌厉"},
      {name:"洪七公",  lv:55, hp:760,  atk:56, def:22, skill:"降龙掌",     state:"internal_injury",      dropGrade:["red"],           desc:"北丐，降龙掌刚猛雄浑"},
      {name:"黄药师",  lv:65, hp:860,  atk:60, def:26, skill:"落英神剑",   state:"combo,break_def",      dropGrade:["red"],           desc:"东邪，奇门音律连绵"},
      {name:"一灯大师",lv:72, hp:900,  atk:58, def:30, skill:"一阳指",     state:"purify_poison,heal",   dropGrade:["red","gold"],    desc:"南帝，一阳指纯阳驱邪"},
      {name:"欧阳锋",  lv:82, hp:1050, atk:72, def:28, skill:"蛤蟆功",     state:"poison,internal_injury",dropGrade:["gold"],          desc:"西毒，蛤蟆功毒劲霸道"},
      {name:"金轮法王",lv:90, hp:1180, atk:80, def:32, skill:"龙象般若功", state:"internal_injury",      dropGrade:["gold"],          desc:"蒙古国师，龙象十三层"},
      {name:"周伯通",  lv:96, hp:1250, atk:78, def:34, skill:"空明拳",     state:"combo",                dropGrade:["gold"],          desc:"中顽童，左右互搏连环"}
    ],

    // 野外明雷怪模板（按等级段）
    wild_mobs: [
      {name:"山贼探子", lv:1,  hp:150,  atk:12, def:3,  dropGrade:["white"]},
      {name:"野狼群",   lv:8,  hp:220,  atk:18, def:5,  dropGrade:["white","blue"]},
      {name:"绿林大盗", lv:18, hp:320,  atk:26, def:8,  dropGrade:["blue"]},
      {name:"恶僧",     lv:30, hp:430,  atk:34, def:12, dropGrade:["blue","purple"]},
      {name:"邪派弟子", lv:45, hp:600,  atk:46, def:16, dropGrade:["purple"]},
      {name:"江湖悍匪", lv:60, hp:720,  atk:54, def:20, dropGrade:["purple","red"]},
      {name:"西域高手", lv:75, hp:860,  atk:64, def:24, dropGrade:["red"]},
      {name:"武林魔头", lv:90, hp:1000, atk:74, def:28, dropGrade:["red","gold"]}
    ],

    // ===== 野外精英敌人配置 =====
    elite_cfg: {
      spawnChance: 0.12,      // 普通怪转精英概率 12%
      hpMult: 1.6,            // 血量倍率
      atkMult: 1.45,          // 攻击倍率
      defMult: 1.3,           // 防御倍率
      goldBonus: 1.8,         // 银两奖励倍率
      equipBonusChance: 0.45, // 精英额外装备掉落概率
      affixPool: ["bleed","poison","slow_qi","break_def","cold_poison"] // 精英随机携带状态词缀
    }
  };

const SAVE_KEY = "jianghu_save";
let player = {};
let currentSchool = null;
let enemy = null;
let inBattle = false;
let currentQuest = null;
let battleBusy = false;
let currentDungeon = null;
let currentScene = "";
let wildSpawns = [];   // 大地图明雷怪 {name,x,y,alive}
let autoBattle = false;
let battleTimer = null;
let lastPlayerQiReady = null;
const QI_PER_TICK = 4;      // 每 tick 基础集气量（乘 qiSpeed）
const TICK_MS = 120;        // 半即时 tick 间隔

const logDom = document.getElementById("battleLog");
const audioAttack = document.getElementById("audioAttack");
const audioHit = document.getElementById("audioHit");
const audioWin = document.getElementById("audioWin");
const audioBgm = document.getElementById("audioBgm");
let bgmStarted = false;

// 安全播放音效：音频文件缺失时静默失败，不中断战斗流程
function safePlay(audio){
  if(!audio) return;
  const p = audio.play();
  if(p && p.catch) p.catch(()=>{});
}

// ========== 属性计算 ==========
function wornEquips(){
  const arr = [];
  if(player.wearWeapon) arr.push(player.wearWeapon);
  if(player.wearArmor) arr.push(player.wearArmor);
  return arr;
}
function calcPlayerStat(){
  let baseAtk = player.baseAtk;
  let baseDef = player.baseDef;
  let qiSpeed = 1.0;
  wornEquips().forEach(e=>{
    baseAtk += (e.atk||0);
    baseDef += (e.def||0);
  });
  const ng = CONFIG.neigong_def[player.nowNeigong];
  if(ng){
    baseAtk += (ng.atk||0) + (ng.passiveAtk||0);
    baseDef += (ng.def||0) + (ng.passiveDef||0);
  }
  const qg = CONFIG.qinggong_def[player.nowQinggong];
  if(qg) qiSpeed = qg.qiSpeed;
  const mod = getStateMod(player);
  const atk = Math.max(1, Math.round(baseAtk * mod.atkMul));
  const def = Math.max(0, Math.round(baseDef * mod.defMul));
  qiSpeed = qiSpeed * mod.qiMul;
  return {atk, def, qiSpeed, mod};
}

// 敌人属性（受自身debuff/buff修正）——【修复】补充集气速度 qiSpeed，使敌人集气与滞气debuff双向生效
function calcEnemyStat(){
  if(!enemy) return {atk:1, def:0, qiSpeed:1, mod:getStateMod(null)};
  const mod = getStateMod(enemy);
  const atk = Math.max(1, Math.round(enemy.atk * mod.atkMul));
  const def = Math.max(0, Math.round((enemy.def||0) * mod.defMul));
  const qiSpeed = 1.0 * mod.qiMul;
  return {atk, def, qiSpeed, mod};
}

// ========== 存档 ==========
function saveGame(){
  localStorage.setItem(SAVE_KEY, JSON.stringify(player));
}
function loadSave(){
  const str = localStorage.getItem(SAVE_KEY);
  if(!str) { alert("没有找到存档！"); return; }
  player = JSON.parse(str);
  // 兼容旧存档：补齐新字段
  player.debuff = player.debuff || [];
  player.buff = player.buff || [];
  player.comboCharge = player.comboCharge || 0;
  player.qi = player.qi || 0;
  player.masterGraduated = !!player.masterGraduated;
  // 【修复】旧存档补齐血内上限并钳制当前值，避免 undefined / 溢出
  player.maxHp = player.maxHp || 300;
  player.maxMp = player.maxMp || 120;
  player.hp = Math.min(player.hp ?? player.maxHp, player.maxHp);
  player.mp = Math.min(player.mp ?? player.maxMp, player.maxMp);
  // 旧存档单槽装备迁移到双槽
  if(player.wearEquip){
    if(player.wearEquip.slot === "armor") player.wearArmor = player.wearEquip;
    else player.wearWeapon = player.wearEquip;
    delete player.wearEquip;
  }
  player.wearWeapon = player.wearWeapon || null;
  player.wearArmor = player.wearArmor || null;
  player.title = player.title || "";
  player.spec = player.spec || "";
  currentSchool = CONFIG.school_list.find(s=>s.school === player.school);
  document.getElementById("menu").classList.add("hide");
  document.getElementById("gamePanel").classList.remove("hide");
  refreshUI();
  addLog("✅ 存档读取成功！");
  tryPlayBgm();
}
function clearSave(){
  localStorage.removeItem(SAVE_KEY);
  alert("存档已删除！");
}

// ========== 门派选择 ==========
function renderSchoolMenu(){
  const wrap = document.getElementById("schoolList");
  wrap.innerHTML = "";
  CONFIG.school_list.forEach(s=>{
    const div = document.createElement("div");
    div.className="school-item";
    div.innerText = s.school + "｜" + s.intro;
    div.onclick = ()=>selectSchool(s);
    wrap.appendChild(div);
  })
}
function selectSchool(sch){
  currentSchool = sch;
  player = {
    school:sch.school,
    lv:1,
    hp:300,maxHp:300,mp:120,maxMp:120,
    baseAtk:12,baseDef:4,
    gold:100,
    learnSkill:[sch.wugong[0]],
    learnNeigong:[sch.neigong[0]],
    learnQinggong:[sch.qinggong[0]],
    nowNeigong:sch.neigong[0].name,
    nowQinggong:sch.qinggong[0].name,
    wearWeapon:null,
    wearArmor:null,
    bag:{equip:[],herb:[],scroll:{white:0,blue:0,purple:0,red:0,gold:0}},
    partners:[],
    activePartner:null,
    debuff:[],
    buff:[],
    comboCharge:0,
    qi:0,
    masterGraduated:false,
    title:"",
    spec:""
  };
  saveGame();
  document.getElementById("menu").classList.add("hide");
  document.getElementById("gamePanel").classList.remove("hide");
  refreshUI();
  addLog(`你拜入【${sch.school}】门下，习得初始武学：${player.learnSkill[0].name}`);
  tryPlayBgm();
}

// ========== Tab切换 ==========
function switchTab(tabName){
  document.querySelectorAll(".tab-content").forEach(d=>d.classList.add("hide"));
  document.getElementById("tab"+tabName.charAt(0).toUpperCase()+tabName.slice(1)).classList.remove("hide");
  if(tabName==="shop") renderShop();
  if(tabName==="partner") renderPartnerList();
}

// ========== 商店 ==========
function renderShop(){
  const wrap = document.getElementById("shopList");
  wrap.innerHTML = "<div>【药材】</div>";
  CONFIG.herb_list.forEach(h=>{
    const div = document.createElement("div");
    div.className="item "+CONFIG.gradeColor[h.grade];
    div.innerText = `${h.name}｜${h.desc}｜价格：${h.price}银两`;
    div.onclick = ()=>buyHerb(h);
    wrap.appendChild(div);
  })
  wrap.innerHTML += "<div style='margin-top:8px'>【白装·兵刃/防具】（更好的装备需打怪掉落）</div>";
  CONFIG.equip_pool.filter(e=>e.grade==="white").forEach(e=>{
    const div = document.createElement("div");
    div.className="item "+CONFIG.gradeColor[e.grade];
    const type = e.slot==="armor" ? "防具" : "兵刃";
    div.innerText = `${e.name}〔${type}〕攻击+${e.atk} 防御+${e.def}｜价格：${e.price}`;
    div.onclick = ()=>buyEquip(e);
    wrap.appendChild(div);
  })
}
function buyHerb(h){
  if(player.gold < h.price){addLog("银两不足！");return;}
  player.gold -= h.price;
  player.bag.herb.push(JSON.parse(JSON.stringify(h)));
  addLog(`购入【${h.name}】`);
  saveGame();refreshUI();
}
function buyEquip(e){
  if(player.gold < e.price){addLog("银两不足！");return;}
  player.gold -= e.price;
  player.bag.equip.push(JSON.parse(JSON.stringify(e)));
  addLog(`购入【${e.name}】`);
  saveGame();refreshUI();
}

// ========== 背包使用、穿戴 ==========
function useHerb(idx){
  const h = player.bag.herb[idx];
  if(!h)return;
  switch(h.effect){
    case "heal": player.hp = Math.min(player.maxHp, player.hp + h.val); addLog(`服用${h.name}，恢复${h.val}气血`);break;
    case "mp": player.mp = Math.min(player.maxMp, player.mp + h.val); addLog(`服用${h.name}，恢复${h.val}内力`);break;
    case "purify": player.debuff = []; addLog(`服用${h.name}，清除全部debuff`);break;
    case "healAll": player.hp=player.maxHp; player.mp=player.maxMp; player.debuff=[]; addLog(`服用${h.name}，满血满内净化！`);break;
  }
  player.bag.herb.splice(idx,1);
  saveGame();refreshUI();
}
function wearEquip(idx){
  const e = player.bag.equip[idx];
  if(!e) return;
  const slot = e.slot || "weapon";
  const key = slot === "armor" ? "wearArmor" : "wearWeapon";
  if(player[key]) player.bag.equip.push(player[key]);
  player[key] = e;
  player.bag.equip.splice(idx,1);
  addLog(`穿戴【${e.name}】（${slot==="armor"?"防具":"兵刃/暗器"}）`);
  saveGame();refreshUI();
}
function unwearEquip(slot){
  const key = slot === "armor" ? "wearArmor" : "wearWeapon";
  if(!player[key]) return;
  player.bag.equip.push(player[key]);
  player[key] = null;
  saveGame();refreshUI();
}

// ========== 奇遇系统：伙伴招募 / 宝箱 / 隐士授艺 ==========
function triggerQuest(){
  if(Math.random() > 0.25) return false;
  const box = document.getElementById("questBox");
  const textDom = document.getElementById("questText");
  const btnBox = document.getElementById("questBtnBox");
  const canQuest = CONFIG.quest_npc.filter(n=>player.lv >= n.minLv && !player.partners.find(p=>p.id === n.id));

  const roll = Math.random();
  if(roll < 0.45 && canQuest.length){
    currentQuest = {type:"recruit", npc: canQuest[Math.floor(Math.random()*canQuest.length)]};
  }else if(roll < 0.80){
    currentQuest = {type:"chest"};
  }else{
    currentQuest = {type:"hermit"};
  }
  box.classList.remove("hide");
  btnBox.innerHTML = "";

  if(currentQuest.type === "recruit"){
    const n = currentQuest.npc;
    textDom.innerHTML = `<div>你偶遇了【${n.name}】</div><div>${n.intro}</div><div>想要邀他同行，需要 ${n.needGold} 银两</div>`;
    const btnJoin = document.createElement("button");
    btnJoin.innerText = "出资邀请入队";
    btnJoin.onclick = ()=>questJoin();
    btnBox.appendChild(btnJoin);
    const btnLeave = document.createElement("button");
    btnLeave.innerText = "拱手告辞";
    btnLeave.onclick = ()=>questLeave();
    btnBox.appendChild(btnLeave);
  }else if(currentQuest.type === "chest"){
    textDom.innerHTML = `<div>📦 路旁草丛里露出一只尘封的木箱</div><div>似是前人遗留，箱中或藏银两、药材、残页与兵刃。</div>`;
    const btnOpen = document.createElement("button");
    btnOpen.innerText = "撬开宝箱";
    btnOpen.onclick = ()=>{ chestReward(); questLeave(); };
    btnBox.appendChild(btnOpen);
    const btnLeave = document.createElement("button");
    btnLeave.innerText = "不去碰它";
    btnLeave.onclick = ()=>questLeave();
    btnBox.appendChild(btnLeave);
  }else{
    // 隐士授艺（专精分支）
    if(!player.spec){
      textDom.innerHTML = `<div>🧙 一位隐世老者在茶棚里打量你良久</div><div>「少年骨骼清奇，可愿择一艺专精？此艺一成，对应招式威力大增。」</div>`;
      Object.entries(CONFIG.spec_def).forEach(([key, sd])=>{
        const b = document.createElement("button");
        b.innerText = sd.name;
        b.title = sd.desc;
        b.onclick = ()=>chooseSpec(key);
        btnBox.appendChild(b);
      });
      const btnLeave = document.createElement("button");
      btnLeave.innerText = "婉言谢绝";
      btnLeave.onclick = ()=>questLeave();
      btnBox.appendChild(btnLeave);
    }else{
      const sd = CONFIG.spec_def[player.spec];
      textDom.innerHTML = `<div>🧙 隐士见你已有【${sd.name}】根基</div><div>略一指点，赠你些许修行资粮。</div>`;
      const btnGift = document.createElement("button");
      btnGift.innerText = "收下赠礼";
      btnGift.onclick = ()=>{ hermitGift(); questLeave(); };
      btnBox.appendChild(btnGift);
    }
  }
  return true;
}
function questJoin(){
  const n = currentQuest && currentQuest.npc;
  if(!n) return;
  if(player.gold < n.needGold){
    addLog(`银两不足，无法邀请${n.name}`);
    questLeave();
    return;
  }
  player.gold -= n.needGold;
  const roll = Math.random();
  if(roll <= n.successRate){
    player.partners.push(JSON.parse(JSON.stringify(n)));
    addLog(`🎉 ${n.name}愿意加入你的队伍！去伙伴面板上阵吧`);
  }else{
    addLog(`${n.name}摇了摇头：${n.refuseText}`);
  }
  questLeave();
  saveGame();refreshUI();
}
// 宝箱奖励：银两 + 药材/残页/装备
function chestReward(){
  const gold = 30 + Math.floor(Math.random()*40) + player.lv*3;
  player.gold += gold;
  let extra = "";
  const roll = Math.random();
  if(roll < 0.4){
    const h = CONFIG.herb_list[Math.floor(Math.random()*2)];
    player.bag.herb.push(JSON.parse(JSON.stringify(h)));
    extra = `、药材【${h.name}】`;
  }else if(roll < 0.7){
    const g = ["white","blue","purple"][Math.min(2, Math.floor(player.lv/15))];
    player.bag.scroll[g] += 3;
    extra = `、${CONFIG.grade_name[g]}残页×3`;
  }else{
    const e = dropEquip(Math.random()<0.5 ? "white" : "blue");
    if(e){ player.bag.equip.push(e); extra = `、【${e.name}】`; }
  }
  addLog(`📦 开启宝箱：银两+${gold}${extra}`);
  saveGame(); refreshUI();
}
// 选择专精分支
function chooseSpec(key){
  if(!CONFIG.spec_def[key]) return;
  player.spec = key;
  const sd = CONFIG.spec_def[key];
  addLog(`🧙 隐士点头：「【${sd.name}】，望你精益求精。」你习得专精【${sd.name}】——${sd.desc}`);
  questLeave();
  saveGame(); refreshUI();
}
// 已选专精后隐士赠礼
function hermitGift(){
  const g = ["white","blue","purple"][Math.min(2, Math.floor(player.lv/15))];
  player.bag.scroll[g] += 2;
  const h = CONFIG.herb_list[Math.floor(Math.random()*CONFIG.herb_list.length)];
  player.bag.herb.push(JSON.parse(JSON.stringify(h)));
  addLog(`🧙 隐士赠你${CONFIG.grade_name[g]}残页×2、【${h.name}】，嘱你好生修炼。`);
  saveGame(); refreshUI();
}
function questLeave(){
  document.getElementById("questBox").classList.add("hide");
  currentQuest = null;
}

// ========== 伙伴面板 ==========
function renderPartnerList(){
  const wrap = document.getElementById("partnerList");
  if(player.partners.length <=0){
    wrap.innerHTML = "<div>暂无伙伴，去秘境碰运气触发奇遇招募！</div>";
    return;
  }
  wrap.innerHTML = "";
  player.partners.forEach((p,i)=>{
    const div = document.createElement("div");
    div.className="item";
    div.innerText = `【${p.name}】招式：${p.skill}｜攻击${p.atk} 防御${p.def} 气血${p.hp}`;
    if(player.activePartner && player.activePartner.id === p.id){
      div.style.border="1px solid #4f8";
      div.innerText += " ✅已上阵";
    }
    div.onclick = ()=>{
      player.activePartner = p;
      addLog(`设置【${p.name}】为上阵伙伴，战斗会协助你`);
      saveGame();refreshUI();
    }
    wrap.appendChild(div);
  })
}

// ========== 秘境地图 ==========
const MAP_POS = [
  {x:0.12,y:0.86}, {x:0.28,y:0.72}, {x:0.20,y:0.54}, {x:0.38,y:0.42},
  {x:0.55,y:0.58}, {x:0.68,y:0.40}, {x:0.60,y:0.24}, {x:0.78,y:0.16},
  {x:0.88,y:0.32}, {x:0.82,y:0.62}
];

function refreshWildSpawns(){
  wildSpawns = [];
  const count = 4;
  for(let i=0;i<count;i++){
    let x=0.5, y=0.5, tries=0;
    do{
      x = 0.12 + Math.random()*0.76;
      y = 0.15 + Math.random()*0.7;
      tries++;
    }while(tries<10 && MAP_POS.some(p=>Math.hypot(p.x-x,p.y-y)<0.12));
    const mob = pickWildMob(player.lv);
    wildSpawns.push({name:mob.name, x, y, alive:true, mob});
  }
}
function removeWildByName(name){
  wildSpawns.forEach(s=>{ if(s.alive && s.name===name) s.alive=false; });
}

function renderMapCanvas(){
  const cv = document.getElementById("mapCanvas");
  if(!cv) return;
  const aliveCount = wildSpawns.filter(s=>s.alive).length;
  if(!wildSpawns.length || aliveCount < 2) refreshWildSpawns();
  const c = cv.getContext("2d");
  const w = cv.width, h = cv.height;

  const g = c.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#1b1b26");
  g.addColorStop(1, "#0d0d15");
  c.fillStyle = g;
  c.fillRect(0, 0, w, h);

  c.strokeStyle = "#34344a";
  c.lineWidth = 2;
  c.beginPath();
  CONFIG.dungeon_list.forEach((d, i)=>{
    const p = MAP_POS[i];
    if(i === 0) c.moveTo(p.x*w, p.y*h);
    else c.lineTo(p.x*w, p.y*h);
  });
  c.stroke();

  CONFIG.dungeon_list.forEach((d, i)=>{
    const p = MAP_POS[i];
    const x = p.x*w, y = p.y*h;
    const unlocked = player.lv >= d.level_min && player.lv <= d.level_max;
    const cleared = player.lv > d.level_max;

    c.beginPath();
    c.arc(x, y, unlocked ? 9 : 6, 0, Math.PI*2);
    c.fillStyle = unlocked ? "#4fd06b" : (cleared ? "#555" : "#2a2a35");
    c.fill();

    if(unlocked){
      c.strokeStyle = "#9f9";
      c.lineWidth = 2;
      c.stroke();
      c.save();
      c.shadowColor = "#4fd06b";
      c.shadowBlur = 14;
      c.beginPath();
      c.arc(x, y, 14, 0, Math.PI*2);
      c.stroke();
      c.restore();
    }

    c.textAlign = "center";
    c.font = "11px sans-serif";
    c.fillStyle = unlocked ? "#e6e6e6" : "#666";
    c.fillText(d.name, x, y - 16);

    c.font = "10px sans-serif";
    c.fillStyle = unlocked ? "#7f7" : "#555";
    c.fillText(`Lv${d.level_min}-${d.level_max}`, x, y + 22);
  });

  // 野外明雷怪（精英为红色高亮，普通为橙色）
  wildSpawns.forEach(s=>{
    if(!s.alive) return;
    const x = s.x*w, y = s.y*h;
    c.beginPath();
    if(s.mob && s.mob.isElite){
      c.fillStyle = "#ff4444";
      c.strokeStyle = "#ffbbbb";
    }else{
      c.fillStyle = "#e08a3b";
      c.strokeStyle = "#f88";
    }
    c.arc(x, y, 7, 0, Math.PI*2);
    c.fill();
    c.lineWidth = 1.5;
    c.stroke();
    c.textAlign = "center";
    c.font = "10px sans-serif";
    c.fillStyle = (s.mob && s.mob.isElite) ? "#ffaaaa" : "#fca";
    c.fillText(s.name, x, y - 12);
  });
}

document.addEventListener("click", e=>{
  if(e.target && e.target.id === "mapCanvas"){
    const cv = e.target;
    const rect = cv.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * cv.width / rect.width;
    const my = (e.clientY - rect.top) * cv.height / rect.height;
    let hit = false;

    // 1) 秘境点
    CONFIG.dungeon_list.forEach((d, i)=>{
      const p = MAP_POS[i];
      const dx = mx - p.x*cv.width, dy = my - p.y*cv.height;
      if(dx*dx + dy*dy < 22*22){
        hit = true;
        if(player.lv >= d.level_min && player.lv <= d.level_max){
          startDungeon(d);
        }else{
          addLog(`等级不符，无法进入【${d.name}】（需 Lv${d.level_min}-${d.level_max}）`);
        }
      }
    });

    // 2) 明雷怪
    if(!hit){
      for(const s of wildSpawns){
        if(!s.alive) continue;
        const dx = mx - s.x*cv.width, dy = my - s.y*cv.height;
        if(dx*dx + dy*dy < 18*18){
          hit = true;
          startBattle(s.mob, "野外");
          break;
        }
      }
    }

    // 3) 点空地：概率随机遭遇
    if(!hit && Math.random() < 0.15){
      addLog("你在野外行走，突然遭遇埋伏！");
      startWildBattle();
    }
  }
});

function renderMapList(){
  renderMapCanvas();
  const wrap = document.getElementById("mapList");
  wrap.innerHTML = "";
  CONFIG.dungeon_list.forEach(d=>{
    if(player.lv >= d.level_min && player.lv <= d.level_max){
      const div = document.createElement("div");
      div.className = "item";
      div.innerText = `${d.name}｜${d.desc}`;
      div.onclick = ()=>startDungeon(d);
      wrap.appendChild(div);
    }
  });
  // 野外闲逛
  const wild = document.createElement("div");
  wild.className = "item";
  wild.innerText = "🌿 野外闲逛（随机遭遇山贼野兽，掉落残页银两）";
  wild.onclick = ()=>startWildBattle();
  wrap.appendChild(wild);
  // 可挑战 BOSS
  CONFIG.boss_list.forEach(b=>{
    if(player.lv >= b.lv - 5 && player.lv <= b.lv + 10){
      const div = document.createElement("div");
      div.className = "item grade-red";
      div.innerText = `👹 ${b.name} Lv${b.lv}｜${b.desc}`;
      div.onclick = ()=>startBattle(Object.assign({}, b, {isBoss:true}), "BOSS挑战");
      wrap.appendChild(div);
    }
  });
}

// ========== 战斗启动 ==========
function makeEnemy(cfg){
  const mp = Math.floor(cfg.hp * 0.4);
  return {
    name:cfg.name, hp:cfg.hp, maxHp:cfg.hp,
    mp: mp, maxMp: mp,
    atk: cfg.atk || Math.floor(cfg.hp/12),
    def: cfg.def || Math.floor(cfg.hp/28),
    lv: cfg.lv || player.lv,
    qi:0, debuff:[], buff:[],
    skill:cfg.skill || "普攻", state:cfg.state || "",
    dropGrade:cfg.dropGrade || ["white"],
    isBoss:!!cfg.isBoss,
    isElite:!!cfg.isElite,
    eliteAffix: cfg.eliteAffix || "",
    aiMode:"normal"
  };
}
function startBattle(cfg, sceneName){
  fxReset();
  inBattle = true;
  enemy = makeEnemy(cfg);
  // 战棋初始站位
  player.pos = {x:1, y:2};
  enemy.pos = {x:6, y:1};
  player.partnerPos = player.activePartner ? {x:1, y:1} : null;
  player.qi = 20;   // 开场玩家略占先手机会
  enemy.qi = 0;
  currentScene = sceneName || "江湖";
  addLog(`=== 【${currentScene}】遭遇${enemy.isBoss ? "BOSS " : ""}${enemy.isElite ? "⚠精英 " : ""}【${enemy.name}】===`);
  // 精英进场，开局自带词缀状态
  if(enemy.isElite && enemy.eliteAffix){
    applyState(enemy, enemy.eliteAffix);
    const affixName = (CONFIG.state_def[enemy.eliteAffix] || {}).name || "";
    addLog(`💥 精英敌人自带词缀【${affixName}】！`);
  }
  refreshUI();
  renderSkillBtn();
}
// 按等级挑可挑战 BOSS
function pickBossForLv(lv){
  const pool = CONFIG.boss_list.filter(b=>b.lv <= lv + 5);
  return pool.length ? pool[pool.length-1] : null;
}
// 按等级挑野外怪模板并随等级成长；有概率roll成精英
function pickWildMob(lv){
  const pool = CONFIG.wild_mobs.filter(m=>m.lv <= lv + 5);
  const m = pool.length ? pool[pool.length-1] : CONFIG.wild_mobs[0];
  const scale = 1 + Math.max(0, lv - m.lv) * 0.05;
  const mob = {
    name:m.name, hp:Math.round(m.hp*scale), atk:Math.round(m.atk*scale),
    def:m.def, lv:lv, dropGrade:m.dropGrade,
    isElite:false, eliteAffix:""
  };
  const ec = CONFIG.elite_cfg;
  if(Math.random() < ec.spawnChance){
    mob.isElite = true;
    mob.name = "【精英】" + mob.name;
    mob.hp = Math.round(mob.hp * ec.hpMult);
    mob.atk = Math.round(mob.atk * ec.atkMult);
    mob.def = Math.round(mob.def * ec.defMult);
    mob.eliteAffix = ec.affixPool[Math.floor(Math.random()*ec.affixPool.length)];
  }
  return mob;
}
function startWildBattle(){ startBattle(pickWildMob(player.lv), "野外"); }

// ========== 进入秘境 ==========
function startDungeon(dun){
  if(triggerQuest()) return;
  currentDungeon = dun;
  let cfg = {name:dun.enemy, hp:dun.hp, dropGrade:dun.dropGrade, isElite:false, eliteAffix:""};
  const boss = pickBossForLv(player.lv);
  if(boss && Math.random() < 0.2){
    cfg = Object.assign({}, boss, {isBoss:true});
    addLog("⚠ 一股强大的气息逼近……");
  }else{
    // 秘境普通敌人小概率刷成精英（概率为野外的 60%）
    if(Math.random() < CONFIG.elite_cfg.spawnChance * 0.6){
      cfg.isElite = true;
      cfg.name = "【精英】" + cfg.name;
      cfg.hp = Math.round(cfg.hp * CONFIG.elite_cfg.hpMult);
      cfg.eliteAffix = CONFIG.elite_cfg.affixPool[Math.floor(Math.random()*CONFIG.elite_cfg.affixPool.length)];
    }
  }
  startBattle(cfg, dun.name);
}
function clearBattleStatus(){
  if(player){ player.debuff = []; player.buff = []; player.comboCharge = 0; player.qi = 0; }
  if(enemy){ enemy.qi = 0; }
  lastPlayerQiReady = null;
}
function exitBattle(){
  battleBusy = false;
  inBattle=false;
  enemy=null;
  currentDungeon=null;
  clearBattleStatus();
  fxReset();
  addLog("退出战斗");
  refreshUI();
}

// ========== 状态(Debuff/Buff) ==========
function hasState(target,type){ return target.debuff && target.debuff.some(x=>x.type===type); }
function hasBuff(target,type){ return target.buff && target.buff.some(x=>x.type===type); }
function stateStack(target,type){ const d=target.debuff.find(x=>x.type===type); return d?d.stack:0; }
function clampTarget(target){
  target.hp = Math.max(0, Math.min(target.maxHp, target.hp));
  target.mp = Math.max(0, Math.min(target.maxMp, target.mp));
}
function targetName(target,isPlayer){ return target.name || (isPlayer?"你":"敌人"); }
function isTargetPlayer(target){ return target === player; }

// 状态数值随等级成长 + 层数叠加系数
function dotLv(){ return (player && player.lv) ? player.lv : 1; }
function dotAmount(cfg, stack){
  const lvScale = 1 + (dotLv() - 1) * 0.06;
  const stackScale = 1 + 0.35 * ((stack||1) - 1);
  return Math.round((cfg.dmg||0) * lvScale * stackScale);
}
function dotMpAmount(cfg, stack){
  const lvScale = 1 + (dotLv() - 1) * 0.06;
  const stackScale = 1 + 0.35 * ((stack||1) - 1);
  return Math.round((cfg.mpDmg||0) * lvScale * stackScale);
}

// 回合结算：dot 扣血扣内、buff 回复、回合递减
function runDebuffTurn(target, isPlayer){
  if(!target) return;
  const label = targetName(target, isPlayer);

  // 持续减益结算
  target.debuff = target.debuff.filter(deb=>{
    const cfg = CONFIG.state_def[deb.type];
    if(!cfg) return false;
    const stack = deb.stack || 1;
    let keep = true;

    if(cfg.type === "dot"){
      const amt = dotAmount(cfg, stack);
      target.hp -= amt;
      addLog(`${label}受到【${cfg.name}】伤害 ${amt}`);
    }else if(cfg.type === "dot_mp"){
      const amt = dotMpAmount(cfg, stack);
      target.mp -= amt;
      addLog(`${label}【${cfg.name}】损耗内力 ${amt}`);
    }else if(cfg.type === "dot_both"){
      const h = dotAmount(cfg, stack);
      const m = dotMpAmount(cfg, stack);
      target.hp -= h; target.mp -= m;
      addLog(`${label}【${cfg.name}】气血-${h}、内力-${m}`);
    }else if(cfg.delayedInjury){
      if(deb.turn <= 1){
        const burst = 15 + player.lv * 2;
        target.hp -= burst;
        addLog(`${label}体内迟发毒伤爆发！重创 ${burst}`);
      }
    }

    deb.turn--;
    if(deb.turn <= 0) keep = false;
    clampTarget(target);
    return keep;
  });

  // 增益buff结算：持续回血/回内
  target.buff = target.buff.filter(bf=>{
    const cfg = CONFIG.state_def[bf.type];
    if(!cfg) return false;
    if(cfg.healRegen){
      const amt = Math.round(target.maxHp * cfg.healRegen);
      target.hp = Math.min(target.maxHp, target.hp + amt);
      addLog(`${label}凭【${cfg.name}】回复 ${amt} 气血`);
    }
    if(cfg.mpRegen){
      const amt = Math.round(target.maxMp * cfg.mpRegen);
      target.mp = Math.min(target.maxMp, target.mp + amt);
    }
    bf.turn--;
    clampTarget(target);
    return bf.turn > 0;
  });
}

// 格式化状态面板文字（减益 + 增益，叠层标注）
function formatStates(target){
  if(!target) return "";
  const parts = [];
  (target.debuff||[]).forEach(d=>{
    const c = CONFIG.state_def[d.type];
    if(c) parts.push(c.name + (d.stack>1 ? `×${d.stack}` : ""));
  });
  (target.buff||[]).forEach(b=>{
    const c = CONFIG.state_def[b.type];
    if(c) parts.push("【"+c.name+"】");
  });
  return parts.join("、");
}

// 读取目标身上所有减益/增益对攻防集气的修正
function getStateMod(target){
  const mod = {atkMul:1, defMul:1, qiMul:1, reflect:0, dodge:0, lockMp:false, antiCold:false, comboBonus:0, stable:false};
  if(!target) return mod;
  (target.debuff||[]).forEach(d=>{
    const cfg = CONFIG.state_def[d.type];
    if(!cfg) return;
    if(cfg.atkDown) mod.atkMul *= (1 - cfg.atkDown);
    if(cfg.defDown) mod.defMul *= (1 - cfg.defDown);
    if(cfg.qiDown) mod.qiMul *= (1 - cfg.qiDown);
    if(cfg.lockMp) mod.lockMp = true;
  });
  (target.buff||[]).forEach(b=>{
    const cfg = CONFIG.state_def[b.type];
    if(!cfg) return;
    if(cfg.atkUp) mod.atkMul *= (1 + cfg.atkUp);
    if(cfg.defUp) mod.defMul *= (1 + cfg.defUp);
    if(cfg.reflect) mod.reflect = Math.max(mod.reflect, cfg.reflect);
    if(cfg.dodge) mod.dodge = Math.max(mod.dodge, cfg.dodge);
    if(cfg.antiCold) mod.antiCold = true;
    if(cfg.comboBonus) mod.comboBonus += cfg.comboBonus;
    if(cfg.stable) mod.stable = true;
  });
  return mod;
}
// 施加状态；source 为出招方（偷内等需要回流内力时使用）
function applyState(target, stateStr, opts){
  if(!target || !stateStr) return;
  opts = opts || {};
  const source = opts.source || null;
  const parts = stateStr.split(",").map(s=>s.trim()).filter(Boolean);
  parts.forEach(raw=>{
    const type = CONFIG.state_alias[raw] || raw;
    const cfg = CONFIG.state_def[type];
    if(!cfg) return;

    // 即时触发类：不入持续数组，当场结算
    if(cfg.type === "instant"){
      // 偷内力：目标内力转给来源
      if(cfg.stealMp && source){
        const lv = (source.lv || (player && player.lv) || 1);
        const amt = Math.min(target.mp, cfg.stealMp + lv);
        if(amt>0){
          target.mp -= amt;
          source.mp = Math.min(source.maxMp, source.mp + amt);
          addLog(`【夺内】从${targetName(target,!isTargetPlayer(target))}身上抽走 ${amt} 内力`);
        }
      }
      // 净化
      if(cfg.purify){
        if(cfg.purify === "all"){ target.debuff = []; addLog(`【净化】清除全部负面状态`); }
        else if(cfg.purify === "poison"){
          const before = target.debuff.length;
          target.debuff = target.debuff.filter(d=>!["poison","cold_poison","poison_delay_injury"].includes(d.type));
          addLog(before > target.debuff.length ? `【纯阳驱毒】清除了身上的毒素` : `你身上本无毒素`);
        }
        else { const last = target.debuff.pop(); if(last) addLog(`【涤秽】驱散了【${CONFIG.state_def[last.type].name}】`); }
      }
      // 疗伤（按比例回血）
      if(cfg.heal){
        const amt = Math.round(target.maxHp * cfg.heal);
        target.hp = Math.min(target.maxHp, target.hp + amt);
        addLog(`【疗伤】回复 ${amt} 气血`);
      }
      clampTarget(target);
      return;
    }

    // 增益buff
    if(cfg.type === "buff"){
      const old = target.buff.find(x=>x.type===type);
      if(old) old.turn = 3;
      else target.buff.push({type, turn:3});
      return;
    }

    // 减益 / dot 类
    const old = target.debuff.find(x=>x.type===type);
    if(old){
      old.stack = Math.min(5, (old.stack||1) + 1);
      old.turn = 3;
    }else{
      target.debuff.push({type, turn:3, stack:1});
    }
  });
}

// ========== 伙伴出手（修复：按敌人修正后防御计算减伤） ==========
function partnerAttack(){
  if(!player.activePartner || !enemy) return;
  const p = player.activePartner;
  const eStat = calcEnemyStat();
  const dmg = Math.max(1, p.atk + Math.floor(Math.random()*10) - Math.floor(eStat.def*0.2));
  enemy.hp -= dmg;
  clampTarget(enemy);
  addLog(`🤝伙伴【${p.name}】施展【${p.skill}】，造成 ${dmg} 伤害！`);
  fxDamage("enemy", dmg, "#9cf");
}

// ========== 战斗 ==========
// 判断是否兵刃类武学（受封兵刃影响）——【修复】扩充棒/杖/杵/扇等武器判定
function isWeaponSkill(skill){
  return /剑|刀|棍|枪|针|镖|箭|戟|棒|杖|杵|扇/.test(skill.name);
}

function calcPlayerDamage(skill, stat){
  let dmgBonus = 1;
  // 本门套路加成
  if(skill.style && currentSchool.wugong.find(w=>w.style === skill.style)) dmgBonus *= 1.25;
  // 装备适配套路：武器套路与出招套路一致，额外增伤
  const wpn = player.wearWeapon;
  if(wpn && wpn.style && wpn.style !== "other" && wpn.style === skill.style) dmgBonus *= 1.15;
  // 专精分支加成
  if(player.spec === "du" && /poison|cold_poison/.test(skill.state||"")) dmgBonus *= 1.15;
  if(player.spec === "anqi" && /针|镖|箭|飞刀|暗器|石|弹/.test(skill.name)) dmgBonus *= 1.15;
  if(player.spec === "quanjiao" && /掌|拳|指|爪|臂|腿|脚/.test(skill.name)) dmgBonus *= 1.15;
  // 伙伴夹击围殴加成
  if(partnerPinching()) dmgBonus *= 1.15;
  // 敌方防御减伤
  const eStat = calcEnemyStat();
  const defReduce = eStat.def * 0.3;
  // 对毒系目标增伤
  if(/poison|cold_poison/.test(skill.state||"") || hasState(enemy,"poison") || hasState(enemy,"cold_poison")){
    if(/dmg_vs_poison|poison/.test(skill.state||"")) dmgBonus *= 1.15;
  }
  // 自损换伤
  let selfCost = 0;
  if(/self_hurt_dmg/.test(skill.state||"")){
    selfCost = Math.round(player.maxHp * 0.08);
    dmgBonus *= 1.4;
  }
  // 伤害浮动
  const mod = stat.mod;
  const rand = mod.stable ? 18 : Math.floor(Math.random()*22 +10);
  let raw = (stat.atk + rand) * dmgBonus - defReduce;
  let dmg = Math.max(1, Math.floor(raw));
  return {dmg, selfCost};
}

// 自然回内；被【封内】锁住则不回复
function regenMp(){
  const pMod = calcPlayerStat().mod;
  if(!pMod.lockMp){
    player.mp = Math.min(player.maxMp, player.mp + Math.round(player.maxMp*0.05));
  }else{
    addLog("【封内】经脉被锁，内力无法自然回复");
  }
}

function useSkill(skill){
  if(!inBattle || battleBusy) return;
  if((player.qi||0) < 100){ addLog("集气未满，无法出招！"); return; }
  // 封兵刃判定
  if(hasState(player,"seal_weapon") && isWeaponSkill(skill)){
    addLog("你的兵刃招式被封住了，无法施展！");
    return;
  }
  // 封武学判定：概率被封印
  if(hasState(player,"seal_skill") && Math.random() < 0.35){
    addLog(`【${skill.name}】被经脉滞涩封住，未能出手！`);
    return;
  }
  const selfCast = ["self","team"].includes(skill.range);
  // 战棋射程校验（自身/团队招式不限距离）
  if(!selfCast && enemy && enemy.pos){
    const dist = manhattan(player.pos, enemy.pos);
    const range = skillRange(skill);
    if(dist > range){
      addLog(`距离太远（${dist} 格），【${skill.name}】射程 ${range} 格，无法命中！先走位拉近。`);
      return;
    }
  }
  if(player.mp < skill.mpCost){ addLog("内力不足！"); return; }
  battleBusy = true;
  player.mp -= skill.mpCost;
  player.qi = 0;   // 出招后集气清空，重新积攒

  const stat = calcPlayerStat();

  if(selfCast){
    // 自身/团队增益类武学：不攻击敌人，状态挂在自己身上
    safePlay(audioAttack);
    fxCast(skill.style);
    addLog(`你运功施展【${skill.name}】，护住周身`);
    if(skill.state) applyState(player, skill.state, {source:player});
    clampTarget(player);
    refreshUI();
  }else{
    const {dmg, selfCost} = calcPlayerDamage(skill, stat);

    // 自损气血
    if(selfCost > 0){
      player.hp -= selfCost;
      clampTarget(player);
      addLog(`【舍身】自损 ${selfCost} 气血，招式威力大涨`);
    }

    safePlay(audioAttack);
    fxCast(skill.style);

    // 敌人闪避判定
    const eMod = calcEnemyStat().mod;
    if(Math.random() < eMod.dodge){
      addLog(`${enemy.name}身形一晃，避开了【${skill.name}】！`);
      fxText("enemy", "闪避", "#9cf");
    }else{
      enemy.hp -= dmg;
      addLog(`你施展【${skill.name}】消耗${skill.mpCost}内力，造成${dmg}伤害！`);
      fxDamage("enemy", dmg);
      // 连击/变招追加一段
      if(/combo|copy_skill/.test(skill.state||"")){
        const comboDmg = Math.max(1, Math.floor(dmg * 0.5));
        enemy.hp -= comboDmg;
        addLog(`【连击】追打一段，再造成 ${comboDmg} 伤害！`);
        fxDamage("enemy", comboDmg, "#f9c");
      }
    }

    // 施加状态（source=player，供偷内回流）
    if(skill.state) applyState(enemy, skill.state, {source:player});
    clampTarget(enemy);
    refreshUI();
  }

  // 玩家行动结算：伙伴协助 → 持续状态 → 回内 → 胜负判定；之后交还半即时节奏
  setTimeout(()=>{
    if(!inBattle){ battleBusy = false; return; }

    if(player.activePartner){
      partnerAttack();
      partnerApproach();
      refreshUI();
    }

    runDebuffTurn(player, true);
    runDebuffTurn(enemy, false);
    regenMp();
    clampTarget(player);
    clampTarget(enemy);
    refreshUI();
    if(enemy.hp <= 0){ winBattle(); battleBusy = false; return; }

    battleBusy = false;   // 敌人由集气 tick 满槽后自动行动
  }, 350);
}

// 自动战斗：朝敌人走近一格
function autoApproach(){
  if(!enemy.pos || !player.pos) return;
  let {x,y} = player.pos;
  const dx = Math.sign(enemy.pos.x - x);
  const dy = Math.sign(enemy.pos.y - y);
  if(dx !== 0 && !occupiedBy(x+dx, y)) x += dx;
  else if(dy !== 0 && !occupiedBy(x, y+dy)) y += dy;
  player.pos = {x,y};
}
// 自动战斗：挑选可用技能
function autoUseSkill(){
  const usable = player.learnSkill.filter(sk=>{
    if(player.mp < sk.mpCost) return false;
    if(hasState(player,"seal_weapon") && isWeaponSkill(sk)) return false;
    return true;
  });
  if(usable.length === 0) return;
  const rank = g => CONFIG.grade_order.indexOf(g.grade);
  usable.sort((a,b)=>rank(b)-rank(a));
  const inRange = usable.filter(sk=>{
    if(["self","team"].includes(sk.range)) return true;
    return manhattan(player.pos, enemy.pos) <= skillRange(sk);
  });
  const atk = (inRange.length?inRange:usable).find(s=>!["self","team"].includes(s.range));
  const pick = atk || usable[0];
  // 攻击技超距时先走近，不出招
  if(atk && !["self","team"].includes(pick.range) &&
     manhattan(player.pos, enemy.pos) > skillRange(pick)){
    autoApproach();
    return;
  }
  useSkill(pick);
}

function toggleAuto(){
  autoBattle = !autoBattle;
  const btn = document.getElementById("autoBtn");
  if(btn) btn.innerText = "自动战斗：" + (autoBattle ? "开" : "关");
  addLog(autoBattle ? "自动战斗已开启，集气满后自动出招" : "自动战斗已关闭");
}

// 半即时集气 tick
function battleQiTick(){
  if(!inBattle || !enemy){ return; }
  const pStat = calcPlayerStat();
  const eStat = calcEnemyStat();
  player.qi = Math.min(100, (player.qi||0) + pStat.qiSpeed * QI_PER_TICK);
  enemy.qi  = Math.min(100, (enemy.qi||0) + eStat.qiSpeed * QI_PER_TICK);

  if(!battleBusy){
    if(enemy.qi >= 100){
      enemyAction();
    }else if(player.qi >= 100 && autoBattle){
      autoUseSkill();
    }
  }
  // 集气满/空状态变化时刷新技能按钮可用性
  const qiReady = (player.qi||0) >= 100;
  if(qiReady !== lastPlayerQiReady){
    lastPlayerQiReady = qiReady;
    if(inBattle) renderSkillBtn();
  }
  refreshQiUI();
}

function refreshQiUI(){
  const pq = Math.round(player.qi||0);
  const eq = enemy ? Math.round(enemy.qi||0) : 0;
  const pEl=document.getElementById("playerQi"), pBar=document.getElementById("playerQiBar");
  const eEl=document.getElementById("enemyQi"), eBar=document.getElementById("enemyQiBar");
  if(pEl) pEl.innerText = pq;
  if(pBar) pBar.style.width = pq+"%";
  if(eEl) eEl.innerText = eq;
  if(eBar) eBar.style.width = eq+"%";
}

// 敌人满槽后由 tick 驱动出手
function enemyAction(){
  if(!enemy || battleBusy) return;
  battleBusy = true;
  enemy.qi = 0;
  enemyTurn();
  setTimeout(()=>{
    if(!inBattle){ battleBusy = false; return; }
    runDebuffTurn(player, true);
    runDebuffTurn(enemy, false);
    clampTarget(player);
    clampTarget(enemy);
    partnerApproach();
    if(player.hp <= 0){
      addLog("你战败了！");
      player.hp = Math.floor(player.maxHp*0.3);
      player.mp = Math.floor(player.maxMp*0.3);
      player.qi = 0;
      fxText("player", "战败", "#f66");
    }
    refreshUI();
    saveGame();
    battleBusy = false;
  }, 350);
}

// 敌人近战逼近玩家（战棋走位）
function enemyApproach(){
  if(!enemy.pos || !player.pos) return;
  let dist = manhattan(enemy.pos, player.pos);
  if(dist <= 1) return;
  let {x,y} = enemy.pos;
  const dx = Math.sign(player.pos.x - x);
  const dy = Math.sign(player.pos.y - y);
  let steps = ENEMY_MOVE;
  while(dist > 1 && steps > 0){
    if(dx !== 0 && !occupiedBy(x+dx, y)){ x += dx; }
    else if(dy !== 0 && !occupiedBy(x, y+dy)){ y += dy; }
    else break;
    dist = manhattan({x,y}, player.pos);
    steps--;
  }
  enemy.pos = {x,y};
  addLog(`${enemy.name}迈步向你逼近`);
}

function enemyTurn(){
  if(!enemy) return;
  const pStat = calcPlayerStat();
  const eStat = calcEnemyStat();
  const rand = Math.random();

  // 精英 AI：优先主动释放自带词缀
  if(enemy.isElite && enemy.eliteAffix && Math.random() < 0.4){
    if(enemy.eliteAffix === "cold_poison" && pStat.mod.antiCold){
      addLog("你阳躯深厚，寒毒被内力震散！");
    }else{
      applyState(player, enemy.eliteAffix);
      addLog(`${enemy.name}运功施展【${(CONFIG.state_def[enemy.eliteAffix]||{}).name||""}】！`);
    }
    clampTarget(player);
    return;
  }

  // AI 1：运功施加负面状态（30%）
  if(rand < 0.30){
    const debList = ["bleed","poison","internal_injury","slow_qi","cold_poison"];
    const pick = debList[Math.floor(Math.random()*debList.length)];
    if(pick === "cold_poison" && pStat.mod.antiCold){
      addLog("你阳躯深厚，寒毒被内力震散！");
    }else{
      applyState(player, pick);
      addLog(`${enemy.name}运功，对你施加【${CONFIG.state_def[pick].name}】！`);
    }
  }
  // AI 2：凝神防御，临时提升自身减伤（12%）
  else if(rand < 0.42){
    applyState(enemy, "def_up");
    addLog(`${enemy.name}凝神聚气，防御力一时大涨！`);
  }
  // AI 3：普通攻击（58%）
  else{
    enemyApproach();   // 近战先逼近
    // 玩家闪避判定
    if(Math.random() < pStat.mod.dodge){
      addLog(`你足尖一点，避开了${enemy.name}的攻势！`);
      fxText("player", "闪避", "#9f9");
      clampTarget(player);
      return;
    }
    let edmg = eStat.atk + Math.floor(Math.random()*12);
    // 反弹（来自玩家 buff）
    if(pStat.mod.reflect > 0){
      const reflectDmg = Math.floor(edmg * pStat.mod.reflect);
      enemy.hp -= reflectDmg;
      addLog(`【卸力反弹】反弹${reflectDmg}伤害给敌人！`);
      fxDamage("enemy", reflectDmg, "#6cf");
    }
    edmg = Math.max(1, edmg - Math.floor(pStat.def * 0.3));
    player.hp -= edmg;
    fxDamage("player", edmg);
    safePlay(audioHit);
    addLog(`${enemy.name}攻击你，造成${edmg}伤害！`);
  }
  clampTarget(player);
  clampTarget(enemy);
}

// 按品级随机掉落一件装备
function dropEquip(grade){
  const pool = CONFIG.equip_pool.filter(e=>e.grade===grade);
  if(!pool.length) return null;
  return JSON.parse(JSON.stringify(pool[Math.floor(Math.random()*pool.length)]));
}
function winBattle(){
  battleBusy = false;
  fxEnemyDie();
  safePlay(audioWin);
  const isBoss = !!enemy.isBoss;
  const isElite = !!enemy.isElite;
  addLog(`✅ 击败【${enemy.name}】！${isBoss?"（BOSS 挑战）":""}${isElite?"（精英）":""}`);
  const grades = enemy.dropGrade || ["white"];
  const grade = grades[Math.floor(Math.random()*grades.length)];
  let scrollCount = 1;
  let gold = 30 + player.lv * 5;
  if(isBoss){ scrollCount = 2; gold += 100; }
  // 精英奖励加成：银两倍率、残页 +1
  if(isElite){
    const ec = CONFIG.elite_cfg;
    gold = Math.round(gold * ec.goldBonus);
    scrollCount += 1;
  }
  player.bag.scroll[grade] += scrollCount;
  player.gold += gold;
  addLog(`获得【${CONFIG.grade_name[grade]}残页】x${scrollCount}，银两+${gold}`);
  // 装备掉落：普通怪 30%，精英额外掉率，BOSS 必掉紫品以上
  let equipChance = isBoss ? 1 : 0.3;
  if(isElite) equipChance += CONFIG.elite_cfg.equipBonusChance;
  if(Math.random() < equipChance){
    let eg;
    if(isBoss){
      eg = ["purple","red","gold"][Math.floor(Math.random()*3)];
    }else if(isElite){
      eg = Math.random() < 0.45 ? "purple" : grade;
    }else{
      eg = grade;
    }
    const eq = dropEquip(eg);
    if(eq){ player.bag.equip.push(eq); addLog(`🗡 掉落装备【${eq.name}】（${CONFIG.grade_name[eq.grade]}）！`); }
  }
  removeWildByName(enemy.name);
  tryUnlockSkill();
  player.lv += 1;
  player.maxHp +=15; player.hp = player.maxHp;
  player.maxMp +=6; player.mp = player.maxMp;
  player.baseAtk +=2; player.baseDef +=1;
  clearBattleStatus();
  inBattle=false; enemy=null;
  saveGame();
  refreshUI();
}
function tryUnlockSkill(){
  const all = currentSchool.wugong;
  for(let sk of all){
    if(player.learnSkill.find(x=>x.name===sk.name)) continue;
    const need = CONFIG.scrollNeed[sk.grade];
    if(player.bag.scroll[sk.grade] >= need){
      player.bag.scroll[sk.grade] -= need;
      player.learnSkill.push(sk);
      addLog(`🎉 残页集齐，解锁武学【${sk.name}】`);
      break;
    }
  }
}

// ========== 自由秘籍参悟（不绑定门派） ==========
function learnFreeSkill(sk){
  if(player.learnSkill.find(x=>x.name===sk.name)){ addLog("已习得【"+sk.name+"】"); return; }
  const need = CONFIG.scrollNeed[sk.grade];
  if(player.bag.scroll[sk.grade] < need){
    addLog(`残卷不足：【${sk.name}】需 ${CONFIG.grade_name[sk.grade]}残页 ${need} 张`); return;
  }
  player.bag.scroll[sk.grade] -= need;
  player.learnSkill.push(JSON.parse(JSON.stringify(sk)));
  addLog(`🎉 参悟秘籍成功，习得【${sk.name}】`);
  saveGame(); refreshUI();
}
function renderFreeSkillList(){
  const wrap = document.getElementById("freeSkillList");
  if(!wrap) return;
  wrap.innerHTML = "";
  CONFIG.free_wugong.forEach(sk=>{
    const owned = player.learnSkill.find(x=>x.name===sk.name);
    const need = CONFIG.scrollNeed[sk.grade];
    const cnt = player.bag.scroll[sk.grade];
    const div = document.createElement("div");
    div.className = "item " + CONFIG.gradeColor[sk.grade];
    if(owned){
      div.innerText = `【${sk.name}】已习得｜${sk.desc}`;
    }else{
      const ok = cnt >= need;
      div.innerText = `【${sk.name}】${sk.desc}｜需${CONFIG.grade_name[sk.grade]}残页${need}（持有${cnt}）`;
      if(ok) div.onclick = ()=>learnFreeSkill(sk);
      else div.style.opacity = "0.5";
    }
    wrap.appendChild(div);
  });
}

// ========== 师门师傅：逐式传授 → 出师 ==========
const TEACH_LV   = {white:1,  blue:5,  purple:10, red:15, gold:20};
const TEACH_GOLD = {white:30, blue:60, purple:120,red:200,gold:300};
// 师傅逐式传授本门武学（red/gold 高阶招式须出师后自行参悟或秘境获取）
function teachSkill(sk){
  const m = CONFIG.master_def[player.school];
  if(!m) return;
  if(player.learnSkill.find(x=>x.name===sk.name)){ addLog(`【${sk.name}】你已习得。`); return; }
  if(["red","gold"].includes(sk.grade)){ addLog(`【${sk.name}】乃本门绝学，须出师后凭机缘参悟，师傅暂不传授。`); return; }
  if(player.lv < TEACH_LV[sk.grade]){ addLog(`火候未到：习得【${sk.name}】需 Lv${TEACH_LV[sk.grade]}。`); return; }
  const cost = TEACH_GOLD[sk.grade];
  if(player.gold < cost){ addLog(`孝敬师傅需银两 ${cost}，眼下不足。`); return; }
  player.gold -= cost;
  player.learnSkill.push(JSON.parse(JSON.stringify(sk)));
  addLog(`👤 【${m.name}】沉吟片刻，将【${sk.name}】一招一式拆解演示：「${sk.desc}」，你默记于心。`);
  saveGame(); refreshUI();
}
function teachSkillByName(name){
  const sk = currentSchool && currentSchool.wugong.find(w=>w.name===name);
  if(sk) teachSkill(sk);
}
function graduateMaster(m){
  player.gold += m.rewardGold;
  if(m.rewardNeigong && !player.learnNeigong.find(n=>n.name===m.rewardNeigong)){
    const ng = currentSchool.neigong.find(n=>n.name===m.rewardNeigong);
    if(ng) player.learnNeigong.push(ng);
  }
  if(m.rewardNeigong && CONFIG.neigong_def[m.rewardNeigong]){
    player.nowNeigong = m.rewardNeigong;   // 自动主运奖励内功
  }
  // 出师专属金装：按门派套路取一件顶级兵刃
  const gift = CONFIG.equip_pool.find(e=>e.grade==="gold" && e.slot==="weapon" && e.style===m.gradStyle);
  if(gift && !player.bag.equip.find(x=>x.name===gift.name)){
    player.bag.equip.push(JSON.parse(JSON.stringify(gift)));
  }
  player.masterGraduated = true;
  player.title = m.gradTitle;
  addLog(`🎓 【${m.name}】抚须道：「你已尽得本门真传，今日准你出师，授称号【${m.gradTitle}】。」`);
  addLog(`📜 出师赠礼：赏银 ${m.rewardGold}，授【${m.rewardNeigong}】${gift ? `，赐兵刃【${gift.name}】` : ""}。`);
  saveGame(); refreshUI();
}
function renderMasterBox(){
  const box = document.getElementById("masterBox");
  if(!box) return;
  const m = CONFIG.master_def[player.school];
  if(!m){ box.innerHTML = "<div>无师门</div>"; return; }
  const skillCount = currentSchool ? currentSchool.wugong.filter(w=>player.learnSkill.find(x=>x.name===w.name)).length : 0;
  const lvOk = player.lv >= m.graduateLv;
  const skOk = skillCount >= m.graduateSkills;

  // 本门武学逐式传授列表
  const schoolWg = currentSchool ? currentSchool.wugong : [];
  const listHtml = schoolWg.map(sk=>{
    const owned = player.learnSkill.find(x=>x.name===sk.name);
    const lvNeed = TEACH_LV[sk.grade], goldNeed = TEACH_GOLD[sk.grade];
    const locked = ["red","gold"].includes(sk.grade);
    if(owned) return `<div class="item ${CONFIG.gradeColor[sk.grade]}">【${sk.name}】已习得 ✅</div>`;
    const canTeach = !locked && player.lv>=lvNeed && player.gold>=goldNeed;
    const btnTxt = locked ? "出师后机缘参悟" : `请教传授（Lv${lvNeed}·银${goldNeed}）`;
    return `<div class="item ${CONFIG.gradeColor[sk.grade]}">【${sk.name}】${sk.desc}
      <button ${canTeach?"":"disabled"} onclick="teachSkillByName('${sk.name}')">${btnTxt}</button></div>`;
  }).join("");

  if(player.masterGraduated){
    box.innerHTML = `<div class="item">【${m.name}】${m.title}｜已出师 ✅<br>称号：【${player.title||m.gradTitle}】<br><span style="color:#999">${m.quote}</span></div>${listHtml}`;
    return;
  }
  box.innerHTML = "";
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `【${m.name}】${m.title}<br><span style="color:#999">${m.quote}</span><br>出师条件：Lv${m.graduateLv}（当前 ${player.lv}）、习得本门 ${m.graduateSkills} 门武学（当前 ${skillCount}）`;
  const btn = document.createElement("button");
  btn.innerText = (lvOk && skOk) ? "拜师出师，领取赠礼" : "请教师傅（未达出师条件）";
  btn.disabled = !(lvOk && skOk);
  btn.onclick = ()=>graduateMaster(m);
  div.appendChild(btn);
  box.appendChild(div);
  const list = document.createElement("div");
  list.innerHTML = listHtml;
  box.appendChild(list);
}

// ========== UI渲染 ==========
function renderSkillBtn(){
  const box = document.getElementById("skillBtnBox");
  box.innerHTML = "";
  const sealWeapon = hasState(player,"seal_weapon");
  const qiReady = (player.qi||0) >= 100;
  player.learnSkill.forEach(sk=>{
    const btn = document.createElement("button");
    const noMp = player.mp < sk.mpCost;
    const locked = sealWeapon && isWeaponSkill(sk);
    let tag = "";
    if(locked) tag = "（封）";
    else if(noMp) tag = "（内不足）";
    else if(!qiReady) tag = "（集气中）";
    btn.innerText = sk.name + tag;
    if(locked || noMp || !qiReady) btn.style.opacity = "0.45";
    else btn.style.opacity = "1";
    btn.onclick = ()=>useSkill(sk);
    box.appendChild(btn);
  })
}
function refreshUI(){
  const stat = calcPlayerStat();
  document.getElementById("playerSchool").innerText = player.school;
  const titleEl = document.getElementById("playerTitle");
  if(titleEl) titleEl.innerText = player.title || "无名小卒";
  const specEl = document.getElementById("playerSpec");
  if(specEl) specEl.innerText = player.spec ? (CONFIG.spec_def[player.spec]||{}).name : "未择专精";
  document.getElementById("playerLv").innerText = player.lv;
  document.getElementById("gold").innerText = player.gold;
  document.getElementById("hp").innerText = Math.max(0,player.hp);
  document.getElementById("maxHp").innerText = player.maxHp;
  document.getElementById("mp").innerText = Math.max(0,player.mp);
  document.getElementById("maxMp").innerText = player.maxMp;
  document.getElementById("atk").innerText = stat.atk;
  document.getElementById("def").innerText = stat.def;
  document.getElementById("qiSpeed").innerText = stat.qiSpeed.toFixed(2);
  document.getElementById("nowNeigong").innerText = player.nowNeigong;
  document.getElementById("nowQinggong").innerText = player.nowQinggong;

  if(enemy){
    document.getElementById("enemyName").innerText = enemy.name;
    document.getElementById("enemyHp").innerText = Math.max(0,enemy.hp);
    document.getElementById("enemyMaxHp").innerText = enemy.maxHp;
    document.getElementById("enemyMp").innerText = Math.max(0,enemy.mp ?? 0);
    document.getElementById("enemyMaxMp").innerText = enemy.maxMp ?? 0;
    document.getElementById("enemyDebuff").innerText = formatStates(enemy);
  }else{
    document.getElementById("enemyName").innerText = "-";
    document.getElementById("enemyHp").innerText = "-";
    document.getElementById("enemyMaxHp").innerText = "-";
    document.getElementById("enemyMp").innerText = "-";
    document.getElementById("enemyMaxMp").innerText = "-";
    document.getElementById("enemyDebuff").innerText = "";
  }
  document.getElementById("partnerFightName").innerText = player.activePartner ? player.activePartner.name : "无";
  player.debuff = player.debuff || [];
  player.buff = player.buff || [];
  document.getElementById("playerDebuff").innerText = formatStates(player);

  const skillWrap = document.getElementById("skillList");
  skillWrap.innerHTML = player.learnSkill.map(s=>`<div class="item ${CONFIG.gradeColor[s.grade]}">${s.name}【套路:${s.style}】</div>`).join("");
  renderFreeSkillList();
  renderMasterBox();

  const wearWrap = document.getElementById("equipWear");
  const w = player.wearWeapon, a = player.wearArmor;
  const slotHtml = (label, eq, slot) => eq
    ? `<div class="item">${label}：${eq.name}〔${CONFIG.style_name[eq.style]||"通用"}〕攻+${eq.atk} 防+${eq.def} <a href="javascript:unwearEquip('${slot}')" style="color:#f88">卸下</a></div>`
    : `<div class="item">${label}：无</div>`;
  wearWrap.innerHTML = slotHtml("兵刃/暗器", w, "weapon") + slotHtml("防具", a, "armor");

  const equipWrap = document.getElementById("equipList");
  equipWrap.innerHTML = player.bag.equip.length>0
    ? player.bag.equip.map((e,i)=>{
        const type = e.slot==="armor"?"防具":"兵刃";
        const st = CONFIG.style_name[e.style]||"通用";
        return `<div class="item ${CONFIG.gradeColor[e.grade]}" onclick="wearEquip(${i})">${e.name}〔${type}·${st}〕攻+${e.atk} 防+${e.def}｜点击穿戴</div>`;
      }).join("")
    : "<div>空</div>";
  const herbWrap = document.getElementById("herbList");
  herbWrap.innerHTML = player.bag.herb.length>0
    ? player.bag.herb.map((h,i)=>`<div class="item ${CONFIG.gradeColor[h.grade]}" onclick="useHerb(${i})">${h.name}｜点击使用</div>`).join("")
    : "<div>空</div>";
  const scrollWrap = document.getElementById("scrollList");
  scrollWrap.innerHTML = Object.entries(player.bag.scroll).map(([g,cnt])=>`<div class="item ${CONFIG.gradeColor[g]}">${CONFIG.grade_name[g]}残页：${cnt}</div>`).join("");

  renderMapList();
  refreshQiUI();
  if(inBattle) renderSkillBtn();
}
function addLog(txt){
  logDom.innerHTML += `<div>${txt}</div>`;
  logDom.scrollTop = logDom.scrollHeight;
}
function restGame(){
  if(confirm("确定重新开局？存档会被清空！")){
    clearSave();
    player = {}; currentSchool = null; enemy=null; inBattle=false; currentQuest=null;
    currentDungeon = null; battleBusy = false;
    fxReset();
    document.getElementById("menu").classList.remove("hide");
    document.getElementById("gamePanel").classList.add("hide");
    logDom.innerHTML = "";
    renderSchoolMenu();
  }
}

// ========== 2D 战斗场景 ==========
const BC = document.getElementById("battleCanvas");
const bctx = BC ? BC.getContext("2d") : null;

// ========== 战棋网格 ==========
const GRID_COLS = 8, GRID_ROWS = 4;
const PLAYER_MOVE = 2;    // 玩家每回合移动力
const ENEMY_MOVE = 2;     // 敌人移动力
// 地形障碍格：不可通行、不可站位
const OBSTACLES = [{x:3,y:1},{x:4,y:2},{x:3,y:2}];
function isObstacle(x,y){ return OBSTACLES.some(o=>o.x===x&&o.y===y); }
function cellW(){ return BC.width / GRID_COLS; }
function cellH(){ return BC.height / GRID_ROWS; }
function cellCenter(pos){ return { x:(pos.x+0.5)*cellW(), y:(pos.y+0.5)*cellH() }; }
function manhattan(a,b){ return Math.abs(a.x-b.x)+Math.abs(a.y-b.y); }
function skillRange(skill){
  switch(skill.range){
    case "single": return 1;
    case "line2": return 2;
    case "smallcross": return 2;
    case "fan": return 2;
    case "bigcross": return 2;
    case "longline": return 3;
    case "halfscreen": return 3;
    case "fullscreen": return 99;
    case "self": case "team": return 0;
    default: return 1;
  }
}
function occupiedBy(x,y){
  if(isObstacle(x,y)) return "obstacle";
  if(enemy && enemy.pos && enemy.pos.x===x && enemy.pos.y===y) return "enemy";
  if(player.activePartner && player.partnerPos && player.partnerPos.x===x && player.partnerPos.y===y) return "partner";
  return null;
}
// 伙伴独立走位：自动向敌人逼近，避开障碍/玩家/敌人
function partnerApproach(){
  if(!player.activePartner || !player.partnerPos || !enemy || !enemy.pos) return;
  const pp = player.partnerPos;
  if(manhattan(pp, enemy.pos) <= 1) return;
  const dx = Math.sign(enemy.pos.x - pp.x);
  const dy = Math.sign(enemy.pos.y - pp.y);
  const tryMove = (nx, ny) => {
    if(nx<0||nx>=GRID_COLS||ny<0||ny>=GRID_ROWS) return false;
    if(isObstacle(nx,ny)) return false;
    if(player.pos && player.pos.x===nx && player.pos.y===ny) return false;
    if(enemy.pos && enemy.pos.x===nx && enemy.pos.y===ny) return false;
    player.partnerPos = {x:nx,y:ny}; return true;
  };
  if(dx!==0 && !tryMove(pp.x+dx, pp.y)){ if(dy!==0) tryMove(pp.x, pp.y+dy); }
  else if(dy!==0) tryMove(pp.x, pp.y+dy);
}
// 夹击：伙伴与敌人相邻，形成阵型围殴
function partnerPinching(){
  return !!(player.activePartner && player.partnerPos && enemy && enemy.pos &&
            manhattan(player.partnerPos, enemy.pos) === 1);
}
// 玩家可移动格集合
function playerMovableCells(){
  const res = [];
  if(!player.pos) return res;
  for(let x=0;x<GRID_COLS;x++){
    for(let y=0;y<GRID_ROWS;y++){
      if(manhattan(player.pos,{x,y}) <= PLAYER_MOVE && !occupiedBy(x,y)){
        res.push({x,y});
      }
    }
  }
  return res;
}

// ========== 内置程序化像素渲染系统（不依赖外部图片资源） ==========
const PIXEL_PAL = {
  skin:"#ffd7b5", skinDark:"#e8b48a", hair:"#1d1d1d",
  white:"#ddd", gray:"#6b6b6b", gold:"#ffc107",
  blue:"#2b60de", red:"#c82423", green:"#2e7d32", yellow:"#ffb300",
  purple:"#9c27b0", darkred:"#b71c1c", elite:"#ff5722"
};

// 门派 → 像素角色衣色
function schoolTheme(school){
  switch(school){
    case "武当派": return "wudang";
    case "华山派": return "huashan";
    case "丐帮": return "gai";
    case "星宿派": return "xingxiu";
    case "逍遥派": return "xiaoyao";
    case "古墓派": return "gumu";
    case "少林派": return "shaolin";
    case "全真教": return "quanzhen";
    case "桃花岛": return "taohua";
    default: return "common";
  }
}
function themeCloth(theme){
  switch(theme){
    case "wudang": return PIXEL_PAL.blue;
    case "huashan": return PIXEL_PAL.red;
    case "gai": return PIXEL_PAL.yellow;
    case "shaolin": return PIXEL_PAL.gray;
    case "xiaoyao": return PIXEL_PAL.gold;
    case "gumu": return PIXEL_PAL.purple;
    case "xingxiu": return PIXEL_PAL.green;
    case "quanzhen": return "#4caf50";
    case "taohua": return "#e91e63";
    case "boss": return PIXEL_PAL.darkred;
    case "elite": return PIXEL_PAL.elite;
    default: return "#3a6ea5";
  }
}

// 场景像素背景贴图（渐变 + 远山 + 地面纹理），全部由代码绘制
function drawPixelSceneBg(ctx, w, h, sceneName){
  let topCol, botCol, ridge;
  switch(sceneName){
    case "山间匪寨": topCol="#3a454f"; botCol="#1e262c"; ridge="#2c3840"; break;
    case "毒蛇谷秘境": topCol="#1a3825"; botCol="#0e2017"; ridge="#16301f"; break;
    case "废弃武馆": topCol="#463b32"; botCol="#2a241e"; ridge="#3a3128"; break;
    case "丐帮分舵之乱": topCol="#483a26"; botCol="#2a2218"; ridge="#3a2f1f"; break;
    case "华山思过崖": topCol="#2b3b52"; botCol="#1a2536"; ridge="#233145"; break;
    case "少林罗汉阵": topCol="#3a444a"; botCol="#22292e"; ridge="#2e383e"; break;
    case "武当纯阳台": topCol="#2b4059"; botCol="#1a293a"; ridge="#243648"; break;
    case "桃花岛幻境": topCol="#4a3448"; botCol="#2a1e2a"; ridge="#3a2838"; break;
    case "西域绝情谷": topCol="#4a3c30"; botCol="#2c241c"; ridge="#3a2f26"; break;
    case "四绝试炼殿": topCol="#313142"; botCol="#1c1c2a"; ridge="#282838"; break;
    default: topCol="#22222e"; botCol="#0d0d14"; ridge="#191922";
  }
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, topCol);
  g.addColorStop(1, botCol);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // 远景像素山峦
  ctx.fillStyle = ridge;
  for(let i=0;i<6;i++){
    const mx = (i/6)*w + 20;
    const mw = w/5;
    ctx.beginPath();
    ctx.moveTo(mx, h*0.42);
    ctx.lineTo(mx+mw/2, h*0.18 + (i%2)*14);
    ctx.lineTo(mx+mw, h*0.42);
    ctx.closePath();
    ctx.fill();
  }
  // 地面
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, h*0.78, w, h*0.22);
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for(let i=0;i<5;i++){
    ctx.beginPath();
    ctx.moveTo(0, h*0.30 + i*12);
    for(let x=0;x<=w;x+=24){
      ctx.lineTo(x, h*0.30 + i*12 + Math.sin(x*0.018+i)*6);
    }
    ctx.stroke();
  }
}

/**
 * 程序化绘制 Q 版像素角色（金庸武侠风）
 * @param ctx 2d 上下文
 * @param cx 中心 x，by 底部 y，pw 宽，ph 高
 * @param theme 门派/敌我主题
 * @param t 时间（呼吸抖动）
 */
function drawPixelWuxiaSprite(ctx, cx, by, pw, ph, theme, t){
  const bob = Math.sin(t*2.2)*2;
  const baseY = by - ph + bob;
  const cloth = themeCloth(theme);
  const px = v => Math.round(v);
  ctx.save();
  // 腿
  ctx.fillStyle = PIXEL_PAL.hair;
  ctx.fillRect(px(cx-pw*0.16), px(baseY+ph*0.82), px(pw*0.12), px(ph*0.18));
  ctx.fillRect(px(cx+pw*0.04), px(baseY+ph*0.82), px(pw*0.12), px(ph*0.18));
  // 身体（衣袍）
  ctx.fillStyle = cloth;
  ctx.fillRect(px(cx-pw*0.26), px(baseY+ph*0.30), px(pw*0.52), px(ph*0.54));
  // 腰带
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(px(cx-pw*0.26), px(baseY+ph*0.60), px(pw*0.52), px(ph*0.08));
  // 手臂
  ctx.fillStyle = cloth;
  ctx.fillRect(px(cx-pw*0.38), px(baseY+ph*0.36), px(pw*0.12), px(ph*0.30));
  ctx.fillRect(px(cx+pw*0.26), px(baseY+ph*0.36), px(pw*0.12), px(ph*0.30));
  // 手
  ctx.fillStyle = PIXEL_PAL.skin;
  ctx.fillRect(px(cx-pw*0.38), px(baseY+ph*0.62), px(pw*0.12), px(ph*0.08));
  ctx.fillRect(px(cx+pw*0.26), px(baseY+ph*0.62), px(pw*0.12), px(ph*0.08));
  // 头
  ctx.fillStyle = PIXEL_PAL.skin;
  ctx.fillRect(px(cx-pw*0.22), px(baseY), px(pw*0.44), px(ph*0.30));
  // 发髻/头发
  ctx.fillStyle = PIXEL_PAL.hair;
  ctx.fillRect(px(cx-pw*0.24), px(baseY), px(pw*0.48), px(ph*0.12));
  ctx.fillRect(px(cx-pw*0.06), px(baseY-ph*0.08), px(pw*0.12), px(ph*0.10));
  // 眼睛
  ctx.fillStyle = "#111";
  ctx.fillRect(px(cx-pw*0.12), px(baseY+ph*0.16), px(pw*0.06), px(ph*0.06));
  ctx.fillRect(px(cx+pw*0.06), px(baseY+ph*0.16), px(pw*0.06), px(ph*0.06));
  ctx.restore();
}

const battleFX = {
  floats: [],
  shake: 0,
  castT: 0,
  castStyle: "",
  enemyDown: 0
};

const CAST_COLOR = {
  taiji:"#6cf", huashan:"#f96", bang:"#fd0", xingxiu:"#9d6",
  xiaoyao:"#9cf", gumu:"#c9f", shaolin:"#fa4", quanzhen:"#9f9",
  taohua:"#f9c", other:"#eee"
};

function fxDamage(side, value, color){
  const w = BC.width, h = BC.height;
  battleFX.floats.push({
    x: side === "enemy" ? w*0.72 : w*0.26,
    y: h*0.42,
    vy: -1.4,
    txt: "-" + value,
    color: color || (side === "enemy" ? "#ff6b6b" : "#ffd166"),
    life: 55
  });
  battleFX.shake = 7;
}
function fxText(side, txt, color){
  const w = BC.width, h = BC.height;
  battleFX.floats.push({
    x: side === "enemy" ? w*0.72 : w*0.26,
    y: h*0.36, vy:-0.8, txt, color: color || "#9cf", life: 65
  });
}
function fxCast(style){
  battleFX.castT = 18;
  battleFX.castStyle = style || "other";
}
function fxEnemyDie(){ battleFX.enemyDown = 45; }
function fxReset(){ battleFX.floats = []; battleFX.enemyDown = 0; battleFX.castT = 0; battleFX.shake = 0; }

function drawHpBar(cx, topY, w, cur, max, color){
  const ratio = Math.max(0, Math.min(1, cur/max));
  bctx.fillStyle = "rgba(0,0,0,0.65)";
  bctx.fillRect(cx-w/2-1, topY-1, w+2, 7);
  bctx.fillStyle = color;
  bctx.fillRect(cx-w/2, topY, w*ratio, 5);
}

function drawSlashEffect(){
  if(battleFX.castT <= 0 || !enemy) return;
  const w = BC.width, h = BC.height;
  const p = 1 - battleFX.castT / 18;
  const ex = w * 0.74, ey = h * 0.55;
  const color = CAST_COLOR[battleFX.castStyle] || "#fff";

  bctx.save();
  const start = -Math.PI * 0.75 + p * Math.PI * 1.5;
  bctx.globalAlpha = (1 - p) * 0.95;
  bctx.strokeStyle = color;
  bctx.lineWidth = 6 * (1 - p * 0.6);
  bctx.shadowColor = color;
  bctx.shadowBlur = 14;
  bctx.beginPath();
  bctx.arc(ex, ey, 72, start, start + 1.0);
  bctx.stroke();

  bctx.globalAlpha = (1 - p) * 0.55;
  bctx.lineWidth = 2;
  bctx.beginPath();
  bctx.arc(ex, ey, 30 + p * 46, 0, Math.PI * 2);
  bctx.stroke();

  bctx.globalAlpha = (1 - p) * 0.8;
  bctx.fillStyle = color;
  for(let i=0;i<4;i++){
    const a = start - i*0.18;
    const r = 72 - i*8;
    bctx.beginPath();
    bctx.arc(ex + Math.cos(a)*r, ey + Math.sin(a)*r, 2.5, 0, Math.PI*2);
    bctx.fill();
  }
  bctx.restore();
}

function drawBattle(){
  if(!bctx) return;
  const w = BC.width, h = BC.height;
  const t = performance.now() / 1000;

  bctx.save();
  if(battleFX.shake > 0){
    bctx.translate((Math.random()-0.5)*battleFX.shake, (Math.random()-0.5)*battleFX.shake);
  }

  // 内置像素场景背景
  drawPixelSceneBg(bctx, w, h, currentDungeon ? currentDungeon.name : currentScene);

  bctx.fillStyle = "rgba(0,0,0,0.4)";
  bctx.fillRect(0, h*0.78, w, h*0.22);

  if(!player || !player.school){
    bctx.fillStyle = "#556";
    bctx.font = "16px sans-serif";
    bctx.textAlign = "center";
    bctx.fillText("选择门派后开始江湖历练", w/2, h/2);
    bctx.restore();
    return;
  }

  if(!enemy && !currentDungeon){
    bctx.fillStyle = "#556";
    bctx.font = "16px sans-serif";
    bctx.textAlign = "center";
    bctx.fillText("选择秘境，开始江湖历练", w/2, h/2);
    bctx.restore();
    return;
  }

  // 战棋网格
  bctx.strokeStyle = "rgba(255,255,255,0.07)";
  bctx.lineWidth = 1;
  for(let gx=1; gx<GRID_COLS; gx++){
    bctx.beginPath(); bctx.moveTo(gx*cellW(),0); bctx.lineTo(gx*cellW(),h); bctx.stroke();
  }
  for(let gy=1; gy<GRID_ROWS; gy++){
    bctx.beginPath(); bctx.moveTo(0, gy*cellH()); bctx.lineTo(w, gy*cellH()); bctx.stroke();
  }

  // 地形障碍格（山石/枯木，不可通行）
  OBSTACLES.forEach(o=>{
    bctx.fillStyle = "rgba(120,120,130,0.35)";
    bctx.fillRect(o.x*cellW()+3, o.y*cellH()+3, cellW()-6, cellH()-6);
    bctx.fillStyle = "rgba(180,180,190,0.5)";
    bctx.font = `${Math.floor(cellW()*0.4)}px sans-serif`;
    bctx.textAlign = "center";
    bctx.fillText("石", (o.x+0.5)*cellW(), (o.y+0.65)*cellH());
  });

  // 可移动格高亮
  if(inBattle && !battleBusy && player.pos){
    playerMovableCells().forEach(c=>{
      bctx.fillStyle = "rgba(79,208,107,0.18)";
      bctx.fillRect(c.x*cellW()+2, c.y*cellH()+2, cellW()-4, cellH()-4);
    });
  }

  // 单位头顶：名字 + 血条 + 内力细条
  function drawUnitLabel(cx, topY, w, name, hp, maxHp, mp, maxMp, hpColor){
    bctx.textAlign = "center";
    bctx.font = "10px sans-serif";
    bctx.fillStyle = "rgba(0,0,0,0.6)";
    bctx.fillText(name, cx+1, topY-11+1);
    bctx.fillStyle = "#fff";
    bctx.fillText(name, cx, topY-11);
    drawHpBar(cx, topY, w, hp, maxHp, hpColor);
    // 内力细条（血条下方）
    if(maxMp > 0){
      const mpRatio = Math.max(0, Math.min(1, (mp||0)/maxMp));
      bctx.fillStyle = "rgba(0,0,0,0.65)";
      bctx.fillRect(cx-w/2-1, topY+8, w+2, 5);
      bctx.fillStyle = "#4a90e2";
      bctx.fillRect(cx-w/2, topY+9, w*mpRatio, 3);
    }
  }

  // 玩家单位（内置像素角色）
  const pc = cellCenter(player.pos || {x:1,y:2});
  const px = pc.x, py = pc.y;
  const pTheme = schoolTheme(player.school);
  drawPixelWuxiaSprite(bctx, px, py+16, 40, 52, pTheme, t);
  drawUnitLabel(px, py-26, 56, player.school || "我", player.hp, player.maxHp, player.mp, player.maxMp, "#4fd06b");

  // 伙伴单位（小像素角色）
  if(player.activePartner && player.partnerPos){
    const pp = cellCenter(player.partnerPos);
    drawPixelWuxiaSprite(bctx, pp.x, pp.y+16, 26, 38, "common", t+0.7);
  }

  if(enemy && enemy.pos){
    const ec = cellCenter(enemy.pos);
    const ex = ec.x, ey = ec.y;
    const eTheme = enemy.isBoss ? "boss" : (enemy.isElite ? "elite" : "common");
    const dead = enemy.hp <= 0;
    bctx.save();
    bctx.globalAlpha = dead ? Math.max(0, battleFX.enemyDown/45) : 1;
    drawPixelWuxiaSprite(bctx, ex, ey+16, 44, 54, eTheme, t+1.3);
    bctx.restore();
    drawUnitLabel(ex, ey-26, 60, enemy.name, enemy.hp, enemy.maxHp, enemy.mp, enemy.maxMp, "#e05555");
  }

  drawSlashEffect();

  bctx.textAlign = "center";
  bctx.font = "bold 18px sans-serif";
  battleFX.floats.forEach(f=>{
    bctx.globalAlpha = Math.min(1, f.life/30);
    bctx.fillStyle = f.color;
    bctx.fillText(f.txt, f.x, f.y);
  });
  bctx.globalAlpha = 1;

  bctx.restore();
}

function updateBattleFX(){
  battleFX.floats.forEach(f=>{ f.y += f.vy; f.vy *= 0.96; f.life--; });
  battleFX.floats = battleFX.floats.filter(f=>f.life > 0);
  if(battleFX.castT > 0) battleFX.castT--;
  if(battleFX.enemyDown > 0) battleFX.enemyDown--;
  if(battleFX.shake > 0){
    battleFX.shake *= 0.86;
    if(battleFX.shake < 0.4) battleFX.shake = 0;
  }
}

function battleLoop(){
  updateBattleFX();
  drawBattle();
  requestAnimationFrame(battleLoop);
}

// ========== BGM ==========
function tryPlayBgm(){
  if(bgmStarted || !audioBgm) return;
  audioBgm.volume = 0.35;
  audioBgm.play()
    .then(()=>{ bgmStarted = true; })
    .catch(()=>{});
}
document.addEventListener("pointerdown", tryPlayBgm);

// ========== 启动 ==========
window.onload = ()=>renderSchoolMenu();
if(bctx) requestAnimationFrame(battleLoop);
// 半即时集气常驻 tick（非战斗时空转）
battleTimer = setInterval(battleQiTick, TICK_MS);

// 战棋：点击格子移动
if(BC){
  BC.addEventListener("click", e=>{
    if(!inBattle || battleBusy || !player.pos) return;
    const rect = BC.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * BC.width / rect.width;
    const my = (e.clientY - rect.top) * BC.height / rect.height;
    const gx = Math.floor(mx / cellW()), gy = Math.floor(my / cellH());
    if(gx<0 || gx>=GRID_COLS || gy<0 || gy>=GRID_ROWS) return;
    const movable = playerMovableCells().some(c=>c.x===gx && c.y===gy);
    if(movable){
      player.pos = {x:gx, y:gy};
      addLog(`你移步到 ${gx+1}-${gy+1} 格`);
      refreshUI();
    }
  });
}// ===================== 【敌方集气｜轻功加成｜头顶三栏血条渲染 整合模块】 =====================
// 功能：敌人集气更新、轻功加成计算、玩家+敌人头顶血/内力/集气条绘制、封内判定、调试日志
function checkEnemyQiSystem() {
    if (!window.enemies || window.enemies.length <= 0) return false;
    let passCount = 0;
    const total = window.enemies.length;

    window.enemies.forEach((enemy, idx) => {
        enemy.qi = enemy.qi ?? 0;
        enemy.maxQi = enemy.maxQi ?? 100;
        enemy.qiSpeedBase = enemy.qiSpeedBase ?? 1.2;
        enemy.qiUpdateEnable = true;

        // 计算最终集气速度：基础速度 + 轻功加成
        const qinggong = enemy.qinggong ?? 0;
        const qgBonus = qinggong * 0.008; // 每1点轻功 +0.008集气速度，可自行调系数
        const internalBonus = enemy.internalQiBonus ?? 0;
        enemy.finalQiSpeed = enemy.qiSpeedBase + qgBonus + internalBonus;

        const ok = enemy.qiUpdateEnable === true && typeof enemy.finalQiSpeed === "number";
        if (ok) {
            passCount++;
            console.log(`【敌方${idx+1}】${enemy.name} ✅ 集气开启 | 集气:${enemy.qi.toFixed(2)}/${enemy.maxQi} 基础:${enemy.qiSpeedBase.toFixed(2)} 轻功加成:${qgBonus.toFixed(3)} 最终速度:${enemy.finalQiSpeed.toFixed(2)}`);
        } else {
            console.error(`【敌方${idx+1}】${enemy.name} ❌ 集气修复失败`, enemy);
        }
    });
    console.log(`【敌方集气汇总】正常：${passCount}/${total}`);
    return passCount === total;
}

// 每秒调试检测
setInterval(() => {
    if (window.inBattle) checkEnemyQiSystem();
}, 1000);

// 劫持战斗循环，更新集气
const rawBattleLoop = window.battleLoop;
if (typeof rawBattleLoop === "function") {
    window.battleLoop = function (...args) {
        const ret = rawBattleLoop(...args);
        if (!window.inBattle || !window.enemies) return ret;
        const dt = window.deltaTime ?? 1 / 60;

        // 敌人集气更新
        window.enemies.forEach(enemy => {
            enemy.qi = enemy.qi ?? 0;
            enemy.maxQi = enemy.maxQi ?? 100;
            enemy.qiSpeedBase = enemy.qiSpeedBase ?? 1.2;
            enemy.qiUpdateEnable = true;

            // 轻功加成
            const qinggong = enemy.qinggong ?? 0;
            const qgBonus = qinggong * 0.008;
            const internalBonus = enemy.internalQiBonus ?? 0;
            enemy.finalQiSpeed = enemy.qiSpeedBase + qgBonus + internalBonus;

            // 封内debuff：集气停止
            if (enemy.hasDebuff && enemy.hasDebuff("封内")) return;

            if (enemy.qiUpdateEnable && enemy.qi < enemy.maxQi) {
                enemy.qi += enemy.finalQiSpeed * dt;
                if (enemy.qi > enemy.maxQi) enemy.qi = enemy.maxQi;
            }
        });

        // 玩家集气同步（和敌人一套规则，玩家也吃轻功加成）
        if (window.player) {
            const p = window.player;
            p.qi = p.qi ?? 0;
            p.maxQi = p.maxQi ?? 100;
            p.qiSpeedBase = p.qiSpeedBase ?? 1.2;
            p.qiUpdateEnable = true;

            const pQg = p.qinggong ?? 0;
            const pQgBonus = pQg * 0.008;
            const pIntBonus = p.internalQiBonus ?? 0;
            p.finalQiSpeed = p.qiSpeedBase + pQgBonus + pIntBonus;

            if (!(p.hasDebuff && p.hasDebuff("封内")) && p.qiUpdateEnable && p.qi < p.maxQi) {
                p.qi += p.finalQiSpeed * dt;
                if (p.qi > p.maxQi) p.qi = p.maxQi;
            }
        }
        return ret;
    };
} else {
    console.warn("⚠️ 没有找到 window.battleLoop，无法挂载集气更新！");
}

// ===================== 头顶血条、内力条、集气条渲染函数 =====================
// 调用时机：在你的canvas绘制角色之后调用 renderStatusBar(target, x, y)
function renderStatusBar(target, x, y) {
    if (!window.ctx) return;
    const ctx = window.ctx;
    const barW = 44;
    const barH = 4;
    const gap = 5;
    let by = y;

    // 1. 血条
    const hpRatio = (target.hp ?? 0) / (target.maxHp ?? 100);
    ctx.fillStyle = "#333";
    ctx.fillRect(x, by, barW, barH);
    ctx.fillStyle = "#e53935";
    ctx.fillRect(x, by, barW * hpRatio, barH);
    by += barH + 1;

    // 2. 内力条
    const mpRatio = (target.mp ?? 0) / (target.maxMp ?? 100);
    ctx.fillStyle = "#333";
    ctx.fillRect(x, by, barW, barH);
    ctx.fillStyle = "#2196f3";
    ctx.fillRect(x, by, barW * mpRatio, barH);
    by += barH + 1;

    // 3. 集气条
    const qiRatio = (target.qi ?? 0) / (target.maxQi ?? 100);
    ctx.fillStyle = "#333";
    ctx.fillRect(x, by, barW, barH);
    ctx.fillStyle = "#ffc107";
    ctx.fillRect(x, by, barW * qiRatio, barH);
    by += gap;

    // 名字文本
    ctx.fillStyle = "#fff";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(target.name ?? "???", x + barW / 2, by);
}

// 【重要】
// 找到你绘制玩家、敌人角色的地方，在绘制完角色之后，加上这一句：
// renderStatusBar(target, drawX, drawY - 28);
// target = player / enemy，drawX drawY是角色绘制坐标
// 示例：
// renderStatusBar(player, player.x, player.y - 28);
// renderStatusBar(enemy, enemy.x, enemy.y - 28);
