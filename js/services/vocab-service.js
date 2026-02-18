/**
 * Vocabulary Service Module (Demo Mode)
 * Provides pre-defined vocabulary for common scenarios
 * Suitable for children aged 5-9
 */

const VocabService = {
    // Pre-defined vocabulary library for common scenarios
    vocabLibrary: {
        '超市': {
            core: [
                { pinyin: 'shōu yín yuán', hanzi: '收银员' },
                { pinyin: 'huò jià', hanzi: '货架' },
                { pinyin: 'tuī chē', hanzi: '推车' },
                { pinyin: 'shāng chǎng', hanzi: '商场' },
                { pinyin: 'cūn huò', hanzi: '村货' }
            ],
            items: [
                { pinyin: 'píng guǒ', hanzi: '苹果' },
                { pinyin: 'niú nǎi', hanzi: '牛奶' },
                { pinyin: 'miàn bāo', hanzi: '面包' },
                { pinyin: 'shuǐ guǒ', hanzi: '水果' },
                { pinyin: 'shū cài', hanzi: '蔬菜' },
                { pinyin: 'bīng xiāng', hanzi: '冰箱' },
                { pinyin: 'wán jù', hanzi: '玩具' },
                { pinyin: 'shū bāo', hanzi: '书包' }
            ],
            environment: [
                { pinyin: 'chū kǒu', hanzi: '出口' },
                { pinyin: 'rù kǒu', hanzi: '入口' },
                { pinyin: 'dēng', hanzi: '灯' },
                { pinyin: 'qiáng', hanzi: '墙' },
                { pinyin: 'shān mìàn', hanzi: '扇面' }
            ]
        },
        '医院': {
            core: [
                { pinyin: 'yī shēng', hanzi: '医生' },
                { pinyin: 'hù shi', hanzi: '护士' },
                { pinyin: 'yào', hanzi: '药' },
                { pinyin: 'bìng chuáng', hanzi: '病床' },
                { pinyin: 'zhěn suǒ', hanzi: '诊所' }
            ],
            items: [
                { pinyin: 'tǐ wēn jì', hanzi: '体温计' },
                { pinyin: 'zhēn', hanzi: '针' },
                { pinyin: 'yào shuǐ', hanzi: '药水' },
                { pinyin: 'yào piàn', hanzi: '药片' },
                { pinyin: 'bēng dài', hanzi: '绷带' },
                { pinyin: 'kǒu zhào', hanzi: '口罩' },
                { pinyin: 'xīng māo', hanzi: '熊猫' },
                { pinyin: 'tīng zhěn qì', hanzi: '听诊器' }
            ],
            environment: [
                { pinyin: 'jī fáng', hanzi: '机房' },
                { pinyin: 'yào fáng', hanzi: '药房' },
                { pinyin: 'guà hào', hanzi: '挂号' },
                { pinyin: 'chá hào', hanzi: '查号' },
                { pinyin: 'mén', hanzi: '门' }
            ]
        },
        '公园': {
            core: [
                { pinyin: 'shù', hanzi: '树' },
                { pinyin: 'huā', hanzi: '花' },
                { pinyin: 'cǎo', hanzi: '草' },
                { pinyin: 'gōng yuán', hanzi: '公园' },
                { pinyin: 'lù dēng', hanzi: '路灯' }
            ],
            items: [
                { pinyin: 'niǎo', hanzi: '鸟' },
                { pinyin: 'bǎn dèng', hanzi: '板凳' },
                { pinyin: 'qiú', hanzi: '球' },
                { pinyin: 'shuǐ chí', hanzi: '水池' },
                { pinyin: 'féng zheng', hanzi: '风筝' },
                { pinyin: 'huá tī', hanzi: '滑梯' },
                { pinyin: 'qiāo qiāo bǎn', hanzi: '跷跷板' },
                { pinyin: 'qī zì qiáo', hanzi: '七字桥' }
            ],
            environment: [
                { pinyin: 'xiǎo lù', hanzi: '小路' },
                { pinyin: 'qiáng wěi', hanzi: '蔷薇' },
                { pinyin: 'shí tòu', hanzi: '石头' },
                { pinyin: 'tíng zi', hanzi: '亭子' },
                { pinyin: 'hú shuǐ', hanzi: '湖水' }
            ]
        },
        '学校': {
            core: [
                { pinyin: 'lǎo shī', hanzi: '老师' },
                { pinyin: 'tóng xué', hanzi: '同学' },
                { pinyin: 'jiào shì', hanzi: '教室' },
                { pinyin: 'hēi bǎn', hanzi: '黑板' },
                { pinyin: 'xué xiào', hanzi: '学校' }
            ],
            items: [
                { pinyin: 'shū bāo', hanzi: '书包' },
                { pinyin: 'bǐ', hanzi: '笔' },
                { pinyin: 'běn zi', hanzi: '本子' },
                { pinyin: 'zhuō zi', hanzi: '桌子' },
                { pinyin: 'yǐ zi', hanzi: '椅子' },
                { pinyin: 'wén jù hé', hanzi: '文具盒' },
                { pinyin: 'rì lì', hanzi: '日历' },
                { pinyin: 'jiàng qí', hanzi: '奖旗' }
            ],
            environment: [
                { pinyin: 'tiān ān mén', hanzi: '天安门' },
                { pinyin: 'xiàng dǎo pái', hanzi: '向导牌' },
                { pinyin: 'guāng qìng', hanzi: '光庆' },
                { pinyin: 'wén jù chǎng', hanzi: '文具厂' },
                { pinyin: 'yuàn zi', hanzi: '院子' }
            ]
        },
        '厨房': {
            core: [
                { pinyin: 'guō', hanzi: '锅' },
                { pinyin: 'píng', hanzi: '瓶' },
                { pinyin: 'chú fáng', hanzi: '厨房' },
                { pinyin: 'chú zi', hanzi: '厨子' },
                { pinyin: 'xiāo yān', hanzi: '消烟' }
            ],
            items: [
                { pinyin: 'chāo sháo', hanzi: '炒勺' },
                { pinyin: 'pán zi', hanzi: '盘子' },
                { pinyin: 'wǎn', hanzi: '碗' },
                { pinyin: 'kuài zi', hanzi: '筷子' },
                { pinyin: 'dāo', hanzi: '刀' },
                { pinyin: 'chá hú', hanzi: '茶壶' },
                { pinyin: 'bēi zi', hanzi: '杯子' },
                { pinyin: 'yùn dōu', hanzi: '熨斗' }
            ],
            environment: [
                { pinyin: 'chuāng', hanzi: '窗' },
                { pinyin: 'mén', hanzi: '门' },
                { pinyin: 'shuǐ chí', hanzi: '水池' },
                { pinyin: 'lú tái', hanzi: '炉台' },
                { pinyin: 'qiáng', hanzi: '墙' }
            ]
        },
        '动物园': {
            core: [
                { pinyin: 'shī zi', hanzi: '狮子' },
                { pinyin: 'dà xiàng', hanzi: '大象' },
                { pinyin: 'hóu zi', hanzi: '猴子' },
                { pinyin: 'cháng jǐng lù', hanzi: '长颈鹿' },
                { pinyin: 'dòng wù yuán', hanzi: '动物园' }
            ],
            items: [
                { pinyin: 'xióng māo', hanzi: '熊猫' },
                { pinyin: 'lǎo hǔ', hanzi: '老虎' },
                { pinyin: 'kǒng què', hanzi: '孔雀' },
                { pinyin: 'píng guǒ', hanzi: '苹果' },
                { pinyin: 'xiāng jiāo', hanzi: '香蕉' },
                { pinyin: 'guān zhòng', hanzi: '观众' },
                { pinyin: 'xiǎo hái', hanzi: '小孩' },
                { pinyin: 'dēng', hanzi: '灯' }
            ],
            environment: [
                { pinyin: 'lán zi', hanzi: '笼子' },
                { pinyin: 'luàn shí', hanzi: '乱石' },
                { pinyin: 'cǎo dì', hanzi: '草地' },
                { pinyin: 'shù mù', hanzi: '树木' },
                { pinyin: 'qiáo', hanzi: '桥' }
            ]
        }
    },

    // Generic fallback vocabulary for unknown topics
    genericVocab: {
        core: [
            { pinyin: 'rén', hanzi: '人' },
            { pinyin: 'wù pǐn', hanzi: '物品' },
            { pinyin: 'shè shī', hanzi: '设施' },
            { pinyin: 'huán jìng', hanzi: '环境' },
            { pinyin: 'jié jīng', hanzi: '洁净' }
        ],
        items: [
            { pinyin: 'qì jù', hanzi: '器具' },
            { pinyin: 'bēi', hanzi: '杯' },
            { pinyin: 'wén jù', hanzi: '文具' },
            { pinyin: 'shū běn', hanzi: '书本' },
            { pinyin: 'wán jù', hanzi: '玩具' },
            { pinyin: 'shuǐ guǒ', hanzi: '水果' },
            { pinyin: 'shū cài', hanzi: '蔬菜' },
            { pinyin: 'nài nǎi', hanzi: '奶奶' }
        ],
        environment: [
            { pinyin: 'qiáng', hanzi: '墙' },
            { pinyin: 'dì bǎn', hanzi: '地板' },
            { pinyin: 'chuāng', hanzi: '窗' },
            { pinyin: 'mén', hanzi: '门' },
            { pinyin: 'dēng', hanzi: '灯' }
        ]
    },

    /**
     * Get vocabulary for a given topic
     * @param {string} topic - The topic/scene name
     * @returns {Object} Vocabulary object with core, items, and environment arrays
     */
    getVocab(topic) {
        // Try to find exact match
        const exactMatch = this.vocabLibrary[topic];
        if (exactMatch) {
            return exactMatch;
        }

        // Try partial match (e.g., "水果超市" matches "超市")
        const partialMatch = Object.keys(this.vocabLibrary).find(key => topic.includes(key));
        if (partialMatch) {
            return this.vocabLibrary[partialMatch];
        }

        // Return generic vocabulary if no match found
        return this.genericVocab;
    },

    /**
     * Get all vocabulary items flattened into a single array
     * @param {string} topic - The topic/scene name
     * @returns {Array} Flat array of vocabulary items
     */
    getAllVocab(topic) {
        const vocab = this.getVocab(topic);
        return [...vocab.core, ...vocab.items, ...vocab.environment];
    },

    /**
     * Format vocabulary items for the prompt template
     * @param {string} topic - The topic/scene name
     * @returns {Object} Formatted strings for each category
     */
    formatForPrompt(topic) {
        const vocab = this.getVocab(topic);

        const formatArray = (arr) => arr.map(item => `${item.pinyin} ${item.hanzi}`).join(', ');

        return {
            core: formatArray(vocab.core),
            items: formatArray(vocab.items),
            environment: formatArray(vocab.environment),
            all: formatArray(this.getAllVocab(topic))
        };
    },

    /**
     * Get the vocabulary as a HTML-formatted string for display
     * @param {string} topic - The topic/scene name
     * @returns {Array} Array of vocabulary items for display
     */
    getDisplayVocab(topic) {
        return this.getAllVocab(topic);
    }
};
