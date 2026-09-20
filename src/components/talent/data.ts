export type Talent = {
  tags?: string[];
  projects?: { name: string; description: string; relationship: 'own' | 'pr'; contribution: string }[];
  sources?: { title: string; publisher: string; kind: 'github' | 'article' | 'website'; description: string }[];
  publicFields?: Partial<Record<import('./intake').Field, string>>; pending?: boolean;
  id: string; name: string; handle: string; initials: string; color: string;
  role: string; location: string; direction: string; bio: string;
  skills: string[]; stars: number; contributions: number; source: string;
  project: string; projectDescription: string; note: string; available: boolean;
};

// Fictional records for the frontend prototype; never presented as GitHub API results.
const records: Talent[] = [
  { id: 'lin', name: '林知远', handle: 'zhiyuan-lab', initials: 'ZY', color: 'sage', role: '全栈开发者 · 开源工具作者', location: '杭州', direction: '全栈开发', bio: '把复杂的问题，做成简单好用的工具。最近在探索 local-first 应用和开发者体验。', skills: ['TypeScript', 'React', 'Rust'], stars: 2840, contributions: 1268, source: 'GitHub + 人工整理', project: 'local-kit', projectDescription: '面向独立开发者的 local-first 应用工具箱', note: '持续维护自己的工具，有完整的文档与产品思考。值得进一步了解。', available: true },
  { id: 'chen', name: '陈以宁', handle: 'yining-builds', initials: 'YN', color: 'lavender', role: 'AI 工程师 · Agent 探索者', location: '上海', direction: 'AI / 机器学习', bio: '让 AI 从 demo 走进真实工作流。关注 Agent 编排、检索增强和模型评测。', skills: ['Python', 'LangChain', 'PyTorch'], stars: 1920, contributions: 986, source: 'GitHub', project: 'agent-workbench', projectDescription: '可观测、可评测的轻量级 Agent 实验台', note: '项目重视评测与可观测性，可以重点聊聊实际落地经验。', available: false },
  { id: 'zhou', name: '周可', handle: 'keke-ui', initials: 'KK', color: 'peach', role: '前端工程师 · 交互细节控', location: '深圳', direction: '前端开发', bio: '代码是另一种设计语言。喜欢做有温度的界面，也在认真打磨无障碍体验。', skills: ['React', 'Vue', 'CSS'], stars: 3680, contributions: 1542, source: 'GitHub + 人工整理', project: 'soft-ui', projectDescription: '为内容产品打造的无障碍交互组件集', note: '个人作品集有丰富的交互案例，组件文档清晰。', available: true },
  { id: 'xu', name: '许一帆', handle: 'yifan-systems', initials: 'YF', color: 'blue', role: '后端工程师 · 基础设施爱好者', location: '北京', direction: '后端 / 基础设施', bio: '关注分布式系统的可靠性。写 Go 和 Rust，偶尔拆解数据库内部实现。', skills: ['Go', 'Rust', 'PostgreSQL'], stars: 860, contributions: 1120, source: 'GitHub', project: 'tiny-queue', projectDescription: '基于 PostgreSQL 的可靠任务队列', note: '持续贡献基础设施项目，对边界条件和故障恢复有深入思考。', available: false },
  { id: 'su', name: '苏漫', handle: 'suman-studio', initials: 'SM', color: 'rose', role: '独立开发者 · 产品创造者', location: '成都', direction: '全栈开发', bio: '从一个想法到一个真正有人用的产品。正在做知识管理与个人效率工具。', skills: ['Next.js', 'TypeScript', 'SQLite'], stars: 1240, contributions: 874, source: '人工整理', project: 'little-notes', projectDescription: '离线可用、数据属于自己的个人知识空间', note: '通过个人博客收录，产品迭代记录完整，待补充 GitHub 数据。', available: true },
  { id: 'lu', name: '陆星河', handle: 'xinghe-ml', initials: 'XH', color: 'sand', role: '机器学习工程师 · 开源贡献者', location: '远程', direction: 'AI / 机器学习', bio: '探索小模型的可能性。关注推理优化、端侧 AI，以及可复现的实验。', skills: ['Python', 'C++', 'ONNX'], stars: 2160, contributions: 1036, source: 'GitHub + 人工整理', project: 'edge-inference', projectDescription: '让小模型在普通设备上高效运行', note: '有完整的基准测试与实验记录，适合进一步了解工程优化能力。', available: false },
];

export const demoTalents: Talent[] = records.map(t => ({
  ...t,
  tags: [t.direction, ...t.skills, ...(t.available ? ['愿意交流'] : [])],
  projects: [
    { name: `${t.handle}/${t.project}`, description: t.projectDescription, relationship: 'own', contribution: '作者 / 维护者 · 持续迭代与文档维护' },
    { name: `community/${t.project}-plugins`, description: '参与社区插件与工具生态建设', relationship: 'pr', contribution: 'PR 贡献 · 修复边界问题，补充测试与使用示例' },
  ],
  sources: [
    { title: `@${t.handle} 的公开主页`, publisher: 'GitHub', kind: 'github', description: '仓库、公开贡献与技术栈' },
    { title: `从想法到作品：${t.project} 的开发故事`, publisher: '开发者专访', kind: 'article', description: '相关报道 · 项目背景与技术实践' },
    { title: '开发日志与技术文章', publisher: '个人博客', kind: 'website', description: '人工收录 · 长期技术探索' },
  ],
}));
