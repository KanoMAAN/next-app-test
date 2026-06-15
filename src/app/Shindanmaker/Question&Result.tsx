type Result = {
    name: string;
    text: string;
}

type Question = {
    n: number;
    text: string;
}

export const results: Result[] = [
    { name:"黒竜", text:"穏やかで面倒見がいいが、計算高く、常に何か考えている。" },
    { name:"植物竜", text:"大きな群れを作り、仲間意識が強い。戦いを嫌うが、仲間を守るためなら残虐になる。" },
    { name:"白竜", text:"山の上に暮らしており、自由気ままにあちこち回遊する。目の前にあるものしか見えていない。" },
    { name:"竜皇帝", text:"帝国を築き、人間を支配している。疑い深く、損得勘定で行動する。" },
];

export const questions: Question[] = [
    { n:1, text:"弱っている人間がいたら助ける？" },
    { n:2, text:"貴方には群れの仲間がいる？" },
    { n:3, text:"人間とは正々堂々戦う？" },
    { n:4, text:"群れで裏切った仲間を追放する？" },
    { n:5, text:"道の真ん中で宝の山を見つけた。貰う？" },
    { n:6, text:"倒した人間の装備品はどうする？" },
    { n:7, text:"人間に攻撃された！" },
];
