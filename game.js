// ===================== 全局配置 =====================
const CONFIG = {
  grade_order: ["white", "blue", "purple", "red", "gold"],
  grade_name: {white:"白色",blue:"蓝色",purple:"紫色",red:"红色",gold:"金色"},
  gradeColor: {white:"grade-white",blue:"grade-blue",purple:"grade-purple",red:"grade-red",gold:"grade-gold"},
  scrollNeed: {white:5,blue:10,purple:20,red:35,gold:50},

  state_def: {
    bleed: {name:"流血",desc:"每回合扣血，降低防御",dmg:12,type:"dot"},
    internal_injury: {name:"内伤",desc:"每回合扣内力，武学冷却变长",dmg:8,type:"dot_mp"},
    poison: {name:"蚀骨毒",desc:"毒素持续侵蚀气血",dmg:15,type:"dot"},
    cold_poison: {name:"寒毒",desc:"同时扣血+扣内力",dmg:10,mpDmg:6,type:"dot_both"},
    rebound: {name:"卸力反弹",desc:"反弹敌方攻击伤害",type:"buff"},
    slow_qi: {name:"滞气",desc:"攻击降低，集气变慢",type:"debuff"},
    seal_weapon: {name:"封兵刃",desc:"不能使用兵刃武学",type:"debuff"},
    seal_skill: {name:"封武学",desc:"封印招式",type:"debuff"}
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

  herb_list: [
    {name:"回血草",grade:"white",effect:"heal",val:60,price:20,desc:"恢复60气血"},
    {name:"凝神花",grade:"blue",effect:"mp",val:40,price:40,desc:"恢复40内力"},
    {name:"清毒草",grade:"blue",effect:"purify",val:0,price:50,desc:"清除身上所有负面debuff"},
    {name:"大还丹",grade:"gold",effect:"healAll",val:0,price:300,desc:"满血满内，清除debuff"}
  ],

  equip_list: [
    {name:"粗布袍",grade:"white",atk:0,def:4,price:30},
    {name:"铁剑",grade:"white",atk:6,def:0,price:40},
    {name:"青布劲装",grade:"blue",atk:2,def:10,price:120},
    {name:"精钢长剑",grade:"purple",atk:14,def:2,price:300},
    {name:"金丝宝甲",grade:"red",atk:4,def:22,price:800},
    {name:"玄铁重剑",grade:"gold",atk:28,def:6,price:2000}
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
    ]
  };

const SAVE_KEY = "jianghu_save";
let player = {};
let currentSchool = null;
let enemy = null;
let inBattle = false;
let currentQuestNpc = null;
let battleBusy = false;
let currentDungeon = null;

const logDom = document.getElementById("battleLog");
const audioAttack = document.getElementById("audioAttack");
const audioHit = document.getElementById("audioHit");
const audioWin = document.getElementById("audioWin");
const audioBgm = document.getElementById("audioBgm");
let bgmStarted = false;

// ========== 属性计算 ==========
function calcPlayerStat(){
  let baseAtk = player.baseAtk;
  let baseDef = player.baseDef;
  let qiSpeed = 1.0;
  if(player.wearEquip){
    baseAtk += player.wearEquip.atk;
    baseDef += player.wearEquip.def;
  }
  const ng = CONFIG.neigong_def[player.nowNeigong];
  if(ng){
    baseAtk += (ng.atk||0);
    baseDef += (ng.def||0);
  }
  const qg = CONFIG.qinggong_def[player.nowQinggong];
  if(qg) qiSpeed = qg.qiSpeed;
  return {atk:baseAtk,def:baseDef,qiSpeed};
}

// ========== 存档 ==========
function saveGame(){
  localStorage.setItem(SAVE_KEY, JSON.stringify(player));
}
function loadSave(){
  const str = localStorage.getItem(SAVE_KEY);
  if(!str) { alert("没有找到存档！"); return; }
  player = JSON.parse(str);
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
    wearEquip:null,
    bag:{equip:[],herb:[],scroll:{white:0,blue:0,purple:0,red:0,gold:0}},
    partners:[],
    activePartner:null,
    debuff:[]
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
  wrap.innerHTML += "<div style='margin-top:8px'>【装备】</div>";
  CONFIG.equip_list.forEach(e=>{
    const div = document.createElement("div");
    div.className="item "+CONFIG.gradeColor[e.grade];
    div.innerText = `${e.name} 攻击+${e.atk} 防御+${e.def}｜价格：${e.price}`;
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
  if(!e)return;
  if(player.wearEquip){
    player.bag.equip.push(player.wearEquip);
  }
  player.wearEquip = e;
  player.bag.equip.splice(idx,1);
  addLog(`穿戴【${e.name}】`);
  saveGame();refreshUI();
}

// ========== 奇遇系统 & 伙伴招募 ==========
function triggerQuest(){
  if(Math.random() > 0.25) return false;
  const canQuest = CONFIG.quest_npc.filter(n=>player.lv >= n.minLv && !player.partners.find(p=>p.id === n.id));
  if(canQuest.length === 0) return false;
  currentQuestNpc = canQuest[Math.floor(Math.random() * canQuest.length)];
  const box = document.getElementById("questBox");
  const textDom = document.getElementById("questText");
  const btnBox = document.getElementById("questBtnBox");
  box.classList.remove("hide");
  textDom.innerHTML = `<div>你偶遇了【${currentQuestNpc.name}】</div><div>${currentQuestNpc.intro}</div><div>想要邀他同行，需要 ${currentQuestNpc.needGold} 银两</div>`;
  btnBox.innerHTML = "";
  const btnJoin = document.createElement("button");
  btnJoin.innerText = "出资邀请入队";
  btnJoin.onclick = ()=>questJoin();
  btnBox.appendChild(btnJoin);
  const btnLeave = document.createElement("button");
  btnLeave.innerText = "拱手告辞";
  btnLeave.onclick = ()=>questLeave();
  btnBox.appendChild(btnLeave);
  return true;
}
function questJoin(){
  if(player.gold < currentQuestNpc.needGold){
    addLog(`银两不足，无法邀请${currentQuestNpc.name}`);
    questLeave();
    return;
  }
  player.gold -= currentQuestNpc.needGold;
  const roll = Math.random();
  if(roll <= currentQuestNpc.successRate){
    player.partners.push(JSON.parse(JSON.stringify(currentQuestNpc)));
    addLog(`🎉 ${currentQuestNpc.name}愿意加入你的队伍！去伙伴面板上阵吧`);
  }else{
    addLog(`${currentQuestNpc.name}摇了摇头：${currentQuestNpc.refuseText}`);
  }
  questLeave();
  saveGame();refreshUI();
}
function questLeave(){
  document.getElementById("questBox").classList.add("hide");
  currentQuestNpc = null;
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

function renderMapCanvas(){
  const cv = document.getElementById("mapCanvas");
  if(!cv) return;
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
}

document.addEventListener("click", e=>{
  if(e.target && e.target.id === "mapCanvas"){
    const cv = e.target;
    const rect = cv.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * cv.width / rect.width;
    const my = (e.clientY - rect.top) * cv.height / rect.height;
    CONFIG.dungeon_list.forEach((d, i)=>{
      const p = MAP_POS[i];
      const dx = mx - p.x*cv.width, dy = my - p.y*cv.height;
      if(dx*dx + dy*dy < 22*22){
        if(player.lv >= d.level_min && player.lv <= d.level_max){
          startDungeon(d);
        }else{
          addLog(`等级不符，无法进入【${d.name}】（需 Lv${d.level_min}-${d.level_max}）`);
        }
      }
    });
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
}

// ========== 进入秘境 ==========
function startDungeon(dun){
  if(triggerQuest()) return;
  currentDungeon = dun;
  fxReset();
  inBattle=true;
  enemy = {
    name:dun.enemy,hp:dun.hp,maxHp:dun.hp,
    atk: Math.floor(dun.hp / 12),
    debuff:[],
    aiMode:"normal"
  };
  addLog(`=== 进入【${dun.name}】，遭遇敌人【${enemy.name}】===`);
  refreshUI();
  renderSkillBtn();
}
function exitBattle(){
  battleBusy = false;
  inBattle=false;
  enemy=null;
  currentDungeon=null;
  fxReset();
  addLog("退出战斗");
  refreshUI();
}

// ========== Debuff ==========
function runDebuffTurn(target,isPlayer){
  const newDebuff = [];
  target.debuff.forEach(deb=>{
    const cfg = CONFIG.state_def[deb.type];
    if(!cfg) return;
    if(cfg.type === "dot"){
      target.hp -= cfg.dmg;
      addLog(`${isPlayer?"你":enemy.name}受到【${cfg.name}】伤害 ${cfg.dmg}`);
    }else if(cfg.type === "dot_mp"){
      target.mp -= cfg.dmg;
      addLog(`${isPlayer?"你":enemy.name}受到【${cfg.name}】内力损耗 ${cfg.dmg}`);
    }else if(cfg.type === "dot_both"){
      target.hp -= cfg.dmg;
      target.mp -= cfg.mpDmg;
      addLog(`${isPlayer?"你":enemy.name}受到【${cfg.name}】气血${cfg.dmg}、内力${cfg.mpDmg}`);
    }
    deb.turn--;
    if(deb.turn>0) newDebuff.push(deb);
  })
  target.debuff = newDebuff;
}
function applyState(target,stateStr){
  if(!stateStr) return;
  const states = stateStr.split(",");
  states.forEach(st=>{
    if(!CONFIG.state_def[st]) return;
    const has = target.debuff.find(x=>x.type===st);
    if(has) has.turn +=2;
    else target.debuff.push({type:st,turn:3});
  })
}

// ========== 伙伴出手 ==========
function partnerAttack(){
  if(!player.activePartner) return;
  const p = player.activePartner;
  const dmg = p.atk + Math.floor(Math.random()*10);
  enemy.hp -= dmg;
  addLog(`🤝伙伴【${p.name}】施展【${p.skill}】，造成 ${dmg} 伤害！`);
  fxDamage("enemy", dmg, "#9cf");
}

// ========== 战斗 ==========
function useSkill(skill){
  if(!inBattle || battleBusy) return;
  if(player.mp < skill.mpCost){ addLog("内力不足！"); return; }
  battleBusy = true;
  player.mp -= skill.mpCost;

  const stat = calcPlayerStat();
  let dmgBonus = 1;
  if(skill.style && currentSchool.wugong.find(w=>w.style === skill.style)) dmgBonus = 1.25;

  let baseDmg = Math.floor((stat.atk + Math.floor(Math.random()*22 +10)) * dmgBonus);
  audioAttack.play();
  addLog(`你施展【${skill.name}】消耗${skill.mpCost}内力，造成${baseDmg}伤害！套路加成${dmgBonus>1?"生效":""}`);
  enemy.hp -= baseDmg;
  fxCast(skill.style);
  fxDamage("enemy", baseDmg);
  if(skill.state) applyState(enemy, skill.state);
  refreshUI();

  setTimeout(()=>{
    if(!inBattle){ battleBusy = false; return; }

    if(player.activePartner){
      partnerAttack();
      refreshUI();
    }

    setTimeout(()=>{
      if(!inBattle){ battleBusy = false; return; }
      if(enemy.hp <= 0){ winBattle(); battleBusy = false; return; }

      runDebuffTurn(player, true);
      runDebuffTurn(enemy, false);
      refreshUI();
      if(enemy.hp <= 0){ winBattle(); battleBusy = false; return; }

      enemyTurn();

      if(player.hp <= 0){
        addLog("你战败了！");
        player.hp = Math.floor(player.maxHp*0.3);
        fxText("player", "战败", "#f66");
      }
      refreshUI();
      saveGame();
      battleBusy = false;
    }, 350);
  }, 350);
}

function enemyTurn(){
  const stat = calcPlayerStat();
  const rand = Math.random();
  if(rand <0.25){
    const debList = ["bleed","poison","internal_injury"];
    const pick = debList[Math.floor(Math.random()*debList.length)];
    applyState(player,pick);
    addLog(`${enemy.name}运功，对你施加【${CONFIG.state_def[pick].name}】！`);
  }else if(rand<0.4){
    addLog(`${enemy.name}凝神防御！`);
  }else{
    let edmg = enemy.atk + Math.floor(Math.random()*12);
    const hasRebound = player.debuff.find(d=>d.type==="rebound");
    if(hasRebound){
      const reflectDmg = Math.floor(edmg * 0.4);
      enemy.hp -= reflectDmg;
      addLog(`【卸力反弹】反弹${reflectDmg}伤害给敌人！`);
      fxDamage("enemy", reflectDmg, "#6cf");
    }
    edmg = Math.max(1, edmg - stat.def*0.3);
    player.hp -= edmg;
    fxDamage("player", edmg);
    audioHit.play();
    addLog(`${enemy.name}攻击你，造成${edmg}伤害！`);
  }
}

function winBattle(){
  battleBusy = false;
  fxEnemyDie();
  audioWin.play();
  addLog(`✅ 击败【${enemy.name}】！`);
  const dun = CONFIG.dungeon_list.find(d=>d.enemy === enemy.name);
  const grade = dun.dropGrade[Math.floor(Math.random()*dun.dropGrade.length)];
  player.bag.scroll[grade] += 1;
  player.gold += 30 + player.lv * 5;
  addLog(`获得【${CONFIG.grade_name[grade]}残页】x1，银两+${30+player.lv*5}`);
  tryUnlockSkill();
  player.lv += 1;
  player.maxHp +=15; player.hp = player.maxHp;
  player.maxMp +=6; player.mp = player.maxMp;
  player.baseAtk +=2; player.baseDef +=1;
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

// ========== UI渲染 ==========
function renderSkillBtn(){
  const box = document.getElementById("skillBtnBox");
  box.innerHTML = "";
  player.learnSkill.forEach(sk=>{
    const btn = document.createElement("button");
    btn.innerText = sk.name;
    btn.onclick = ()=>useSkill(sk);
    box.appendChild(btn);
  })
}
function refreshUI(){
  const stat = calcPlayerStat();
  document.getElementById("playerSchool").innerText = player.school;
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
    document.getElementById("enemyDebuff").innerText = enemy.debuff.map(d=>CONFIG.state_def[d.type]?.name).join("、");
  }else{
    document.getElementById("enemyName").innerText = "-";
    document.getElementById("enemyHp").innerText = "-";
    document.getElementById("enemyMaxHp").innerText = "-";
    document.getElementById("enemyDebuff").innerText = "";
  }
  document.getElementById("partnerFightName").innerText = player.activePartner ? player.activePartner.name : "无";
  player.debuff = player.debuff || [];
  document.getElementById("playerDebuff").innerText = player.debuff.map(d=>CONFIG.state_def[d.type]?.name).join("、");

  const skillWrap = document.getElementById("skillList");
  skillWrap.innerHTML = player.learnSkill.map(s=>`<div class="item ${CONFIG.gradeColor[s.grade]}">${s.name}【套路:${s.style}】</div>`).join("");

  const wearWrap = document.getElementById("equipWear");
  wearWrap.innerHTML = player.wearEquip ? `<div class="item">${player.wearEquip.name} 攻击+${player.wearEquip.atk} 防御+${player.wearEquip.def}</div>` : "<div>无</div>";

  const equipWrap = document.getElementById("equipList");
  equipWrap.innerHTML = player.bag.equip.length>0
    ? player.bag.equip.map((e,i)=>`<div class="item ${CONFIG.gradeColor[e.grade]}" onclick="wearEquip(${i})">${e.name} 攻击+${e.atk} 防御+${e.def}｜点击穿戴</div>`).join("")
    : "<div>空</div>";
  const herbWrap = document.getElementById("herbList");
  herbWrap.innerHTML = player.bag.herb.length>0
    ? player.bag.herb.map((h,i)=>`<div class="item ${CONFIG.gradeColor[h.grade]}" onclick="useHerb(${i})">${h.name}｜点击使用</div>`).join("")
    : "<div>空</div>";
  const scrollWrap = document.getElementById("scrollList");
  scrollWrap.innerHTML = Object.entries(player.bag.scroll).map(([g,cnt])=>`<div class="item ${CONFIG.gradeColor[g]}">${CONFIG.grade_name[g]}残页：${cnt}</div>`).join("");

  renderMapList();
  if(inBattle) renderSkillBtn();
}
function addLog(txt){
  logDom.innerHTML += `<div>${txt}</div>`;
  logDom.scrollTop = logDom.scrollHeight;
}
function restGame(){
  if(confirm("确定重新开局？存档会被清空！")){
    clearSave();
    player = {}; currentSchool = null; enemy=null; inBattle=false; currentQuestNpc=null;
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

const PLAYER_ART = "assets/player/idle.png";
const BG_ART = {
  "山间匪寨":"assets/bg/shanfei.png",
  "毒蛇谷秘境":"assets/bg/dushe.png",
  "废弃武馆":"assets/bg/jiaotou.png",
  "丐帮分舵之乱":"assets/bg/panbang.png",
  "华山思过崖":"assets/bg/jianzong.png",
  "少林罗汉阵":"assets/bg/luohan.png",
  "武当纯阳台":"assets/bg/wudang.png",
  "桃花岛幻境":"assets/bg/taohua.png",
  "西域绝情谷":"assets/bg/ligui.png",
  "四绝试炼殿":"assets/bg/silian.png"
};
const ENEMY_ART = {
  "山匪":"assets/enemy/shanfei.png",
  "毒蛇妖":"assets/enemy/dushe.png",
  "武馆教头":"assets/enemy/jiaotou.png",
  "叛帮弟子":"assets/enemy/panbang.png",
  "剑宗弟子":"assets/enemy/jianzong.png",
  "罗汉守僧":"assets/enemy/luohan.png",
  "武当守道":"assets/enemy/wudang.png",
  "桃花岛影卫":"assets/enemy/taohua.png",
  "谷中厉鬼":"assets/enemy/ligui.png",
  "试炼虚影":"assets/enemy/silian.png"
};

const IMG_CACHE = {};

function getImg(key, src){
  if(!src) return null;
  if(IMG_CACHE[key]) return IMG_CACHE[key];
  const im = new Image();
  im.onerror = ()=>{ im._failed = true; };
  im.src = src;
  IMG_CACHE[key] = im;
  return im;
}
function isReady(im){
  return im && im.complete && im.naturalWidth > 0 && !im._failed;
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

function drawCover(img, dx, dy, dw, dh){
  const iw = img.naturalWidth, ih = img.naturalHeight;
  if(!iw || !ih) return false;
  const scale = Math.max(dw/iw, dh/ih);
  const sw = iw*scale, sh = ih*scale;
  bctx.drawImage(img, dx+(dw-sw)/2, dy+(dh-sh)/2, sw, sh);
  return true;
}
function drawSprite(img, cx, bottomY, maxW, maxH){
  const iw = img.naturalWidth, ih = img.naturalHeight;
  if(!iw || !ih) return false;
  const scale = Math.min(maxW/iw, maxH/ih);
  const w = iw*scale, h = ih*scale;
  bctx.drawImage(img, cx-w/2, bottomY-h, w, h);
  return true;
}
function drawPlaceholder(cx, bottomY, w, h, color, label){
  bctx.fillStyle = color;
  bctx.fillRect(cx-w/2, bottomY-h, w, h);
  bctx.fillStyle = "#fff";
  bctx.font = "12px sans-serif";
  bctx.textAlign = "center";
  bctx.textBaseline = "middle";
  bctx.fillText(label, cx, bottomY-h/2);
}
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

  const bg = currentDungeon ? getImg("bg:"+currentDungeon.name, BG_ART[currentDungeon.name]) : null;
  if(!isReady(bg) || !drawCover(bg, 0, 0, w, h)){
    const g = bctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#20202c");
    g.addColorStop(1, "#0d0d14");
    bctx.fillStyle = g;
    bctx.fillRect(0, 0, w, h);
  }

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

  const px = w*0.26, py = h*0.88;
  const bob = Math.sin(t*2) * 2;
  const pImg = getImg("player", PLAYER_ART);
  if(!isReady(pImg) || !drawSprite(pImg, px, py+bob, 92, 128)){
    drawPlaceholder(px, py, 44, 76, "#3a6ea5", player.school || "我");
  }
  drawHpBar(px, py-140, 84, player.hp, player.maxHp, "#4fd06b");

  if(enemy){
    const ex = w*0.74, ey = h*0.88;
    const eImg = getImg("enemy:"+enemy.name, ENEMY_ART[enemy.name]);
    const dead = enemy.hp <= 0;
    bctx.save();
    bctx.globalAlpha = dead ? Math.max(0, battleFX.enemyDown/45) : 1;
    if(!isReady(eImg) || !drawSprite(eImg, ex, ey+Math.sin(t*2+1)*2, 110, 140)){
      drawPlaceholder(ex, ey, 52, 84, "#8a3b3b", enemy.name);
    }
    bctx.restore();
    drawHpBar(ex, ey-150, 100, enemy.hp, enemy.maxHp, "#e05555");
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