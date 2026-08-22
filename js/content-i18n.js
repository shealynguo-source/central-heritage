// 百年中环 - 建筑内容多语言数据（繁体 / 英文）
// 索引与 content.js 的 SITES 数组一一对应（site.id）
// 结构：SITES_I18N[siteId]['zh-TW' | 'en'] = { name, style, tag, intro, intro2, funFact1:{title,text}, funFact2:{title,text}, photoTip }
const SITES_I18N = {
  0: {
    'zh-TW': {
      name: '聖約翰座堂',
      style: '哥德復興式',
      tag: '信仰 · 香港最古老西式教堂',
      intro: '聖約翰座堂坐落於中環花園道，始建於1847年，並於1849年落成祝聖，是香港現存歷史最悠久的西式教會建築物。作為香港聖公會港島教區的主教座堂，它見證了香港從一個小漁村演變為國際金融中心的整個過程。',
      intro2: '教堂建築採用了19世紀歐洲流行的哥德復興式風格，兼具諾曼式特色。其高聳的尖塔、精美的哥德式尖拱窗以及厚重的石牆，營造出莊嚴而寧靜的聖潔氛圍。在日佔時期（1941–1945年），座堂曾遭遇嚴重破壞，甚至被日軍徵用作為社交會所，內部許多珍貴設施與歷史文物毀於一旦。重光之後，座堂歷經多次修復，逐步還原了其昔日的莊嚴風貌，並在1996年被列為香港法定古蹟。如今，它依然保持著日常的宗教儀式，是繁華中環鬧市裡一片珍貴的精神淨土。',
      funFact1: {
        title: '香港唯一擁有「永久業權」的土地',
        text: '在香港，所有土地的業權本質上都是向政府租賃的「官地」，唯獨聖約翰座堂所在的這片土地是個例外！根據1847年頒布的《聖約翰座堂條例》，該地段擁有唯一的「永久業權」（Freehold），前提是這塊土地必須持續作為教堂使用。如果有一天它不再用於宗教用途，業權將無償收歸政府。'
      },
      funFact2: {
        title: '沒有空調時代的「防暑智慧」',
        text: '座堂建立於19世紀中葉，當時還沒有電風扇和空調。為了應對香港夏季悶熱潮濕的氣候，建築師巧妙地設計了可以百葉摺疊的木窗，並採用了非常高大的穹頂設計。這種設計形成了極佳的空氣對流系統，即使在炎夏，走進座堂也能感受到一陣自然清爽的微風。'
      },
      photoTip: '走出座堂正門，站在主入口的草坪邊緣仰拍，可以將座堂古典的哥德式尖塔與背景裡現代感十足的中銀大廈、長江集團中心同框拍下，構成一幅絕妙的「新舊時空交錯」經典畫面！'
    },
    'en': {
      name: "St. John's Cathedral",
      style: 'Gothic Revival',
      tag: 'Faith · HK\'s Oldest Western Church',
      intro: "St. John's Cathedral sits on Garden Road in Central. Construction began in 1847 and it was consecrated in 1849, making it the oldest surviving Western church building in Hong Kong. As the cathedral of the Diocese of Hong Kong Island, it has witnessed Hong Kong's transformation from a small fishing village into an international financial centre.",
      intro2: "The church adopts the Gothic Revival style popular in 19th-century Europe, with Norman characteristics. Its towering spires, exquisite pointed Gothic windows and thick stone walls create a solemn, serene and sacred atmosphere. During the Japanese occupation (1941–1945), the cathedral was badly damaged and even requisitioned as a social club, with many precious fittings and historical artefacts destroyed. After liberation, it underwent repeated restoration, gradually recovering its former solemn splendour, and was declared a statutory monument in 1996. Today it continues to hold regular services — a precious spiritual oasis in the bustling heart of Central.",
      funFact1: {
        title: "Hong Kong's only freehold land",
        text: 'In Hong Kong, all land is essentially leased from the government as "official land" — except for the site of St. John\'s Cathedral! Under the St. John\'s Cathedral Ordinance of 1847, the site holds the territory\'s only freehold title, on the condition that it continues to be used as a church. If it ever ceases to be used for religious purposes, ownership reverts to the government.'
      },
      funFact2: {
        title: 'Air-conditioning wisdom from a pre-AC era',
        text: "The cathedral was built in the mid-19th century, before electric fans and air conditioners existed. To cope with Hong Kong's hot, humid summers, the architect designed louvred folding wooden windows and a very tall vaulted ceiling. This creates excellent natural air circulation — even on scorching days, stepping inside brings a naturally refreshing breeze."
      },
      photoTip: "Stand at the edge of the lawn at the main entrance and shoot upward to frame the cathedral's classical Gothic spires with the strikingly modern Bank of China Tower and Cheung Kong Center behind — a perfect \"old meets new\" classic shot!"
    }
  },
  1: {
    'zh-TW': {
      name: '都爹利街煤氣燈',
      style: '殖民時期市政設施',
      tag: '日常 · 香港僅存的煤氣燈',
      intro: '都爹利街位於中環繁華商業區的一角，其最著名的特色便是一條連接雪廠街的古老花崗石階，以及安裝在石階兩端頭尾的四盞煤氣街燈。這條石階與煤氣燈均建於1875至1889年之間，是香港殖民時期市政基礎設施的重要遺存。',
      intro2: '在電燈普及之前，煤氣燈曾是19世紀末香港街頭主要的照明工具。隨著時代演進，全港的煤氣街燈逐步被電燈取代，而都爹利街這四盞煤氣燈則作為香港城市發展的歷史見證被特意保留下來。它們是目前全香港僅存的四盞依然提供日常照明的煤氣街燈。1979年，這四盞煤氣燈與石階一道被列為香港法定古蹟。即使經歷了一百多年的風雨與颱風破壞，經過精心修繕後，它們至今仍由香港中華煤氣公司繼續提供煤氣並自動點亮，延續著百年前的昏黃光影。',
      funFact1: {
        title: 'TVB劇集與香港電影的「分手與相遇聖地」',
        text: '如果你是資深港劇迷，對這條石階一定不會陌生！在80、90年代及2000年代初的TVB劇集（如《妙手仁心》《法證先鋒》）以及王家衛的電影中，都爹利街石階幾乎是主角們心事重重、深夜談心、偶然相遇甚至傷感分手的「專屬背景」。昏黃的煤氣燈光營造出了極具懷舊感與戲劇張力的都市氛圍。'
      },
      funFact2: {
        title: '英國生產商都已停產的「孤品」',
        text: '這四盞煤氣燈是由英國的「雙羅車公司」（Suggs & Co.）製造的雙吐燈頭款式。令人唏噓的是，連英國原廠都早已停止生產這種型號的煤氣燈。為了維護這四盞「活化石」，香港煤氣公司必須專門通過人工訂製零件來進行日常保養與修復。'
      },
      photoTip: '建議在傍晚6點左右前往（煤氣燈每天傍晚會自動點亮）。坐在石階的中段，由下往上仰拍，將柔和的煤氣燈光與石階上方的綠蔭交融在一起，能拍出濃厚復古港風氛圍感的大片！'
    },
    'en': {
      name: 'Duddell Street Gas Lamps',
      style: 'Colonial-era municipal facility',
      tag: "Heritage · HK's Last Gas Lamps",
      intro: "Duddell Street sits in a corner of Central's bustling business district, famous for an old granite staircase linking to Ice House Street, with four gas lamps at the two ends. Both the staircase and the lamps were built between 1875 and 1889, making them important surviving colonial-era municipal infrastructure.",
      intro2: "Before electricity became widespread, gas lamps were the main street lighting of late-19th-century Hong Kong. As the city modernised, gas lamps were gradually replaced — yet these four on Duddell Street were deliberately preserved as witnesses to the city's development. They are the last four working gas street lamps in Hong Kong. In 1979, they and the staircase were declared statutory monuments. Despite over a century of storms and typhoons, after careful restoration they are still lit automatically every evening by The Hong Kong and China Gas Company, carrying on a dim amber glow first kindled a hundred years ago.",
      funFact1: {
        title: "TVB's and Hong Kong cinema's sacred spot for partings and reunions",
        text: "If you're a veteran of Hong Kong TV dramas, this staircase will look familiar! In 1980s–2000s TVB series (e.g. Healing Hands, Forensic Heroes) and Wong Kar-wai's films, the Duddell Street steps were almost the \"signature backdrop\" for troubled protagonists, late-night heart-to-hearts, chance meetings and tearful farewells. The dim gaslight creates an intensely nostalgic, dramatic urban atmosphere."
      },
      funFact2: {
        title: 'A "rare relic" even its British maker has discontinued',
        text: 'These four lamps are twin-burner models made by Suggs & Co. of Britain. Sadly, even the original British factory ceased production of this model long ago. To maintain these four "living fossils", The Hong Kong and China Gas Company must commission bespoke replacement parts for their daily upkeep and repair.'
      },
      photoTip: 'Visit around 6 pm (the lamps are lit automatically every evening). Sit halfway up the staircase and shoot upwards from below, blending the soft gaslight with the greenery above — the perfect nostalgic old-Hong-Kong shot!'
    }
  },
  2: {
    'zh-TW': {
      name: '皇后像廣場',
      style: '殖民時期公共廣場',
      tag: '權力 · 為何沒有皇后像？',
      intro: '皇后像廣場坐落於中環核心地帶，建於19世紀末的填海工程之上，曾是香港殖民時期最核心的公共與儀式空間。廣場因曾停放維多利亞女王銅像而得名，但隨著二戰期間銅像被日軍運走，廣場的秩序與意涵也隨之重塑。如今，矗立於廣場北部最矚目的建築核心，便是建於1923年的和平紀念碑。',
      intro2: '和平紀念碑由時任港督司徒拔爵士揭幕，最初旨在紀念第一次世界大戰中的陣亡將士。二戰結束後，碑身加刻了「1939-1945」字樣以悼念二次大戰的犧牲者；1980年代又增刻了中文字「英魂不朽 浩氣長存」。紀念碑仿照倫敦白廳和平紀念碑設計，採用莊嚴的新古典主義石棺造型。從昔日的帝國權力象徵到如今肅穆的和平悼念地，皇后像廣場與和平紀念碑共同見證了香港從戰火走向繁榮的百年滄桑，並於2013年被列為香港法定古蹟。',
      funFact1: {
        title: '肉眼看不見的天才視覺錯覺',
        text: '和平紀念碑看似只是簡單的石質結構，但建築師埃德溫·魯琴斯（Edwin Lutyens）在其中運用了極高深的古希臘建築光學矯正手法！紀念碑的所有立面其實都不是絕對垂直或平行的：如果將它的垂直線條向上延伸，它們會在地面上方1000英尺處相交；而它的水平曲面，其實是一段巨大的圓弧截面。正是這種微妙的微凸設計（Entasis），才讓人們在近距離仰視時，能在視覺上感受到絕對的直線與無可比擬的平穩莊嚴感。'
      },
      funFact2: {
        title: '「皇后」不在，唯留紀念碑與大班',
        text: '廣場原有的女王銅像在戰後被移至銅鑼灣維多利亞公園，「皇后像廣場」就此成為了一個「沒有皇后像」的廣場。如今廣場上僅存一座香港早期金融巨頭——滙豐大班昃臣爵士的銅像，與佇立在遮打道旁的和平紀念碑遙遙相對，構成了中環「歷史記憶」與「金融帝國」交錯的獨特景象。'
      },
      photoTip: '站在遮打道南側草坪邊緣，以較低的視線仰拍：可以將和平紀念碑頂部的石棺與花圈雕飾置於畫面中央，背景剛好能框入終審法院大樓的穹頂與中銀大廈的現代幾何線條，一張照片即可完美收錄「歷史、正義與現代」三重中環意象！'
    },
    'en': {
      name: 'Statue Square',
      style: 'Colonial-era public square',
      tag: 'Power · Why is there no statue?',
      intro: 'Statue Square sits in the heart of Central, built on land reclaimed in the late 19th century. It was the most important public and ceremonial space of colonial Hong Kong. Named after the statue of Queen Victoria that once stood there, the square was reshaped after the statue was removed by the Japanese during WWII. Today, the most prominent structure in the north of the square is the Cenotaph, built in 1923.',
      intro2: 'The Cenotaph was unveiled by Governor Sir Reginald Stubbs, originally to commemorate those who fell in the First World War. After WWII, "1939-1945" was added in tribute to the fallen of the Second World War, and in the 1980s the Chinese inscription was added. Modelled on the Cenotaph at Whitehall in London, it takes the form of a solemn Neoclassical sarcophagus. From a symbol of imperial power to a solemn memorial, Statue Square and the Cenotaph together have witnessed a century of Hong Kong\'s passage from war to prosperity, and were declared a statutory monument in 2013.',
      funFact1: {
        title: "A genius optical illusion you can't see",
        text: "The Cenotaph looks like a simple stone structure, but architect Edwin Lutyens employed masterful optical refinements from classical Greek architecture! None of its faces are truly vertical or parallel: extended upward, its vertical lines would meet 1,000 feet above the ground, while its horizontal curves are segments of enormous arcs. This subtle entasis lets viewers perceive perfectly straight lines and unshakable stability when gazing up close."
      },
      funFact2: {
        title: 'The queen is gone — only the Cenotaph and the taipan remain',
        text: "After the war, the square's statue of the Queen was moved to Victoria Park in Causeway Bay, leaving \"Statue Square\" a square without a statue. Today the only statue is of Sir Thomas Jackson, the great HSBC taipan of early Hong Kong, standing opposite the Cenotaph along Chater Road — a striking juxtaposition of \"historical memory\" and \"financial empire\" in Central."
      },
      photoTip: "Stand at the edge of the lawn south of Chater Road and shoot upward from a low angle: place the Cenotaph's sarcophagus and wreath carvings at the centre, with the dome of the Court of Final Appeal and the geometric lines of Bank of China Tower framed in the background — one frame capturing history, justice and modernity in Central!"
    }
  },
  3: {
    'zh-TW': {
      name: '終審法院大樓',
      style: '新古典主義',
      tag: '法律 · 正義女神為何蒙眼？',
      intro: '終審法院大樓（前身為最高法院大樓）位於中環昃臣道，於1912年正式啟用，由英國著名建築師阿斯頓·韋伯（Aston Webb，曾設計白金漢宮東面正面）等設計。它是香港新古典主義建築的傑出代表，亦是香港法治歷史的重要象徵。',
      intro2: '大樓外觀極其宏偉，採用了古希臘與古羅馬風格的愛奧尼柱（Ionic columns）環繞，頂部配有巨大的穹頂。在百餘年歷史中，大樓的功能幾經變更：二戰前為最高法院；日佔時期被日軍徵用為憲兵總部；1985年至2011年期間，這裡曾是香港立法會大樓；2015年，大樓在經過精心重修後，重新回歸其法律使命，正式成為香港終審法院所在地。大樓在1981年被列為香港法定古蹟，其莊嚴的建築語言展現了司法獨立與公正的至高尊嚴。',
      funFact1: {
        title: '正義女神泰米斯（Themis）為何蒙眼？',
        text: '在大樓三角楣飾的頂端，立著一座高聳的天平正義女神雕像。仔細觀察會發現，女神雙眼被布條蒙住，一手提天平，一手握劍。蒙眼（Blindfold）代表著「法律面前人人平等」，意味著司法審判不受被告人的身份、地位、財富或容貌影響，只憑客觀的事實與證據作出公正裁決。'
      },
      funFact2: {
        title: '地下暗藏「日軍酷刑室」歷史',
        text: '在二戰日佔時期，憲兵隊將大樓用作總部，大樓地下室曾被改造為拘留所與審訊室，許多抗日人士在此遭受酷刑。如今大樓重新作為終審法院使用，這段沉重的歷史沉澱在大樓基座之下，提醒著人們和平與法治的彌足珍貴。'
      },
      photoTip: '站在遮打道與昃臣道交界處，使用手機廣角鏡頭仰拍大樓正面：宏偉的拱廊柱組與頂部的正義女神像相輝映，是捕捉香港法治精神與新古典主義建築美學的絕佳角度。'
    },
    'en': {
      name: 'Court of Final Appeal Building',
      style: 'Neoclassical',
      tag: 'Law · Why is Lady Justice blindfolded?',
      intro: 'The Court of Final Appeal Building (formerly the Supreme Court Building) stands on Jackson Road in Central and opened in 1912. It was designed by prominent British architects including Aston Webb (who designed the east front of Buckingham Palace). It is an outstanding example of Neoclassical architecture in Hong Kong and an important symbol of the rule of law.',
      intro2: 'The building is extremely grand, surrounded by Ionic columns in the ancient Greek and Roman manner, crowned by a great dome. Over a century its role has changed many times: the Supreme Court before WWII; the Japanese gendarmerie headquarters during the occupation; the Legislative Council from 1985 to 2011; and since 2015, after careful restoration, it has returned to the law as home of the Court of Final Appeal. Declared a statutory monument in 1981, its solemn architectural language embodies the supreme dignity of judicial independence and justice.',
      funFact1: {
        title: 'Why is Lady Justice (Themis) blindfolded?',
        text: "Atop the pediment stands a towering statue of Themis holding scales. Look closely and you'll see her eyes are bound by a cloth, a pair of scales in one hand and a sword in the other. The blindfold represents \"equality before the law\" — justice is administered without regard to a defendant's identity, status, wealth or appearance, based solely on objective facts and evidence."
      },
      funFact2: {
        title: 'The hidden "Japanese torture chamber" below',
        text: 'During the WWII occupation, the Japanese gendarmerie used the building as headquarters, converting the basement into a detention and interrogation centre where many resisters were tortured. The building now serves again as the Court of Final Appeal, this heavy history resting beneath its foundations, a reminder of how precious peace and the rule of law truly are.'
      },
      photoTip: "Stand at the junction of Chater Road and Jackson Road and shoot the building's facade with a wide-angle lens: the grand colonnade and the statue of Themis above create a perfect composition for capturing Hong Kong's spirit of justice and Neoclassical beauty."
    }
  },
  4: {
    'zh-TW': {
      name: '中銀大廈',
      style: '現代主義 · 貝聿銘設計',
      tag: '現代 · 竹子般的摩天樓',
      intro: '中銀大廈位於中環花園道1號，於1989年完工、1990年正式啟用，是華裔建築大師貝聿銘（I. M. Pei）的代表作之一。大樓高315米（加天線達367.4米），落成時曾是亞洲第一高樓，亦是當時北美以外最高的天際線地標。',
      intro2: '貝聿銘在大樓設計中巧妙融入了中國傳統文化隱喻，以「節節高升」的竹筍作為設計靈感。整座大樓由四個不同高度的三稜柱體組合而成，立面採用結構主義的X型鋼架交錯支撐，極具幾何立體美感與未來感。中銀大廈不僅標誌著香港在20世紀末躍升為全球金融樞紐的輝煌成就，更展現了現代建築技術與東方哲學的完美交融。直到今天，它依然是香港天際線中最具辨識度、最耀眼的標誌性建築之一。',
      funFact1: {
        title: '「節節高升」與中環風水大戰',
        text: '中銀大廈的外形靈感雖源自「竹子節節高升」，但其鋒利的三角稜角和X型三稜鏡結構，在香港傳統風水學中被誤讀為「三把利刃」，其中一把刃甚至直指當時的港督府（現香港禮賓府）和旁邊的滙豐總行。這引發了中環著名的「風水傳奇」——滙豐後來在大樓頂層加裝了兩門「樓頂吊臂（形似樓頂炮台）」進行化解。這成為了中環都市傳說中最津津樂道的故事。'
      },
      funFact2: {
        title: '極為天才的無柱結構工程學',
        text: '為了抵禦頻繁侵襲香港的強颱風，貝聿銘採用了創新的「空間網架結構體系」。整座大樓內部沒有一根內部支柱，全靠四座角柱和外部X型斜撐承重，不僅極大地節省了鋼材用量，還創造了超高利用率的室內無柱空間。'
      },
      photoTip: '站在花園道纜車總站旁邊的天橋上，順著道路延伸方向仰拍中銀大廈，可以讓立體交叉的X型玻璃幕牆在藍天白雲下折射出璀璨光芒，極其震撼！'
    },
    'en': {
      name: 'Bank of China Tower',
      style: 'Modernist · by I. M. Pei',
      tag: 'Modern · A skyscraper like a bamboo shoot',
      intro: 'Bank of China Tower stands at 1 Garden Road, Central. Completed in 1989 and opened in 1990, it is a masterpiece of Chinese-American architect I. M. Pei. Rising 315 metres (367.4 m with antenna), it was the tallest building in Asia upon completion and the tallest skyline landmark outside North America.',
      intro2: 'Pei wove Chinese cultural metaphor into the design, drawing inspiration from the bamboo shoot, which "rises higher joint by joint." The tower is formed from four triangular prisms of differing heights, its facade braced by structuralist X-shaped steel frames — a striking geometry with a futuristic feel. Bank of China Tower not only marks Hong Kong\'s late-20th-century rise as a global financial hub but also embodies a perfect fusion of modern engineering and Eastern philosophy. To this day it remains one of the most recognisable, dazzling icons of Hong Kong\'s skyline.',
      funFact1: {
        title: '"Rising bamboo" and Central\'s feng shui battle',
        text: 'The tower\'s form is inspired by the bamboo shoot, but its sharp triangular angles and X-shaped prism structure were read in traditional feng shui as "three blades", one allegedly aimed at Government House and the neighbouring HSBC headquarters. This sparked Central\'s famous feng shui legend — HSBC responded by mounting two "rooftop cranes" (cannon-like structures) on its roof to counter the threat. It remains one of Central\'s most beloved urban legends.'
      },
      funFact2: {
        title: 'A brilliant column-free structural engineering feat',
        text: 'To withstand the powerful typhoons that frequently batter Hong Kong, Pei adopted an innovative spatial truss system. The building has no internal columns — all loads are carried by four corner columns and the external X-shaped braces — greatly reducing steel usage while creating vast column-free interior spaces.'
      },
      photoTip: 'Stand on the footbridge beside the Garden Road Peak Tram terminus and shoot upward along the road\'s perspective: the intersecting X-shaped glass facade refracts dazzling light against the blue sky and white clouds — truly breathtaking!'
    }
  }
};

// 显式挂载到 window，供 app.js / i18n.js 访问
window.SITES_I18N = SITES_I18N;
