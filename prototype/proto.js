/*
 * 采购合同审查 Agent：可点击高保真原型。
 * 内容全部来自项目真实运行记录（contract-review-agent 仓库）：
 *   - 合同 AGRI-R4 / GOODS-R3：构造评测集 evals/contracts.jsonl（正文为项目自写，非示范文本原文）
 *   - 审查意见：run trace 5d24afa31217（审查 + 依据校验后的版本）
 *   - 追问回答：run trace ae26d8340a78
 *   - 金额与谈判优先级（第 6 屏）：合同 V3-GOODS-12（构造评测集 evals/contracts_v3.jsonl），
 *     run trace 1b8ba398165b，与公开回放页 site/data.json 的第一条回放逐项相同。
 *     AGRI-R4 的运行记录早于金额测算（ADR 014），所以第 3 到 5 屏没有金额，没有补写。
 *   - 依据原文：只展示《民法典》条文和构造的公司规范；示范文本原文受版权限制，不展示
 */
(() => {
  "use strict";

  // ---------------- 数据 ----------------
  const AGRI = `农产品买卖合同
合同编号：AGRI-R4
甲方（买受人）：瑞丰贸易有限公司
住所：山东省青岛市
乙方（出卖人）：黑龙江北垦粮食购销有限公司
住所：黑龙江省哈尔滨市
签订地点：青岛
根据《中华人民共和国民法典》等有关法律法规，甲乙双方在平等、自愿、公平和诚信的基础上，经协商一致，订立本合同。
第一条 标的、数量和价款
品名：粳米；规格：一级；计量单位：吨；数量：200；单价：人民币5808元/吨（含税）；合同总额：人民币1161600元。
第二条 质量标准
粳米的质量应当符合GB/T 1354《大米》中一级的规定。到货后由双方共同委托具有资质的粮油质量检验机构，按照 GB/T 5491《粮食、油料检验 扦样、分样法》扦样检验，检验结果作为质量判定依据。
第三条 交付
乙方应当在合同签订后三十日内向甲方交付货物，交付地点为甲方指定地点，运输费用由乙方承担。
第四条 检验与验收
乙方交付货物即视为甲方验收合格，甲方此后不得再就质量问题提出异议。
第五条 价款支付
甲方在验收合格并收到乙方开具的合规发票后三十日内支付全部价款。
第六条 定金
甲方应当在合同签订后三日内向乙方支付合同总额百分之三十的定金。
第七条 保密
甲方对在履行本合同过程中知悉的乙方商业秘密、技术资料和数据负有永久保密义务；甲方违反保密义务的，应当向乙方支付违约金人民币五十万元。
第八条 违约责任
任何一方违约的，应当赔偿因此给对方造成的直接损失。逾期付款或者逾期履行的，每逾期一日，按逾期部分金额的万分之五支付违约金，违约金总额不超过合同总额的百分之十。
第九条 责任限制
除因故意或者重大过失造成的损失，以及因侵犯知识产权、违反保密义务造成的损失外，任何一方在本合同项下的赔偿责任总额不超过合同总额，且不包括间接损失和可得利益损失。
第十条 合同解除
有下列情形之一的，守约方可以书面通知对方解除本合同：（一）因不可抗力致使不能实现合同目的；（二）一方迟延履行主要债务，经催告后在三十日内仍未履行；（三）法律规定的其他情形。
第十一条 合同期限
本合同有效期一年，期满终止。双方有意续签的，应当在期满前三十日内协商一致并另行签订书面合同。
第十二条 不可抗力
因不可抗力不能履行合同的，根据不可抗力的影响，部分或者全部免除责任，但是法律另有规定的除外。遭遇不可抗力的一方应当及时通知对方，并在合理期限内提供证明。
第十三条 争议解决
因本合同发生的争议，双方应当协商解决；协商不成的，由甲方住所地人民法院管辖。
第十四条 通知与送达
本合同首部载明的地址为双方的送达地址。一方变更送达地址的，应当在变更后三日内书面通知对方。
第十五条 其他
本合同自双方签字盖章之日起生效。本合同一式两份，双方各执一份，具有同等法律效力。`;

  const GOODS = `工业品买卖合同
合同编号：GOODS-R3
甲方（买受人）：____________（待填）
住所：____________
乙方（出卖人）：____________（待填）
住所：____________
签订地点：苏州
根据《中华人民共和国民法典》等有关法律法规，甲乙双方在平等、自愿、公平和诚信的基础上，经协商一致，订立本合同。
第一条 标的、数量和价款
品名：三相异步电动机；规格：YE3-7.5kW；计量单位：台；数量：20；单价：人民币3685元/台（含税）；合同总额：人民币73700元。
第二条 质量标准
乙方提供的货物应当符合国家标准、行业标准；双方另有技术要求的，以双方签字确认的书面技术文件为准。
第三条 交付
乙方应当在合同签订后三十日内向甲方交付货物，交付地点为甲方指定地点，运输费用由乙方承担。
第四条 检验与验收
甲方应当在货物到达之日起二日内完成检验，逾期未提出书面异议的，视为货物的数量和质量均符合约定。
第五条 价款支付
甲方在验收合格并收到乙方开具的合规发票后三十日内支付全部价款。
第六条 定金
甲方应当在合同签订后五日内向乙方支付合同总额百分之十的定金，定金在最后一期付款时抵作价款。一方违约时，对方可以选择适用定金条款或者违约金条款，但不得同时适用。
第七条 保密
双方对在履行本合同过程中知悉的对方商业秘密、技术资料和数据负有保密义务，未经对方书面同意不得向第三方披露；保密义务在本合同终止后五年内持续有效。
第八条 违约责任
任何一方违约的，应当赔偿因此给对方造成的直接损失。逾期付款或者逾期履行的，每逾期一日，按逾期部分金额的万分之五支付违约金，违约金总额不超过合同总额的百分之十。`;

  const GOODS12 = `工业品买卖合同
合同编号：V3-GOODS-12
甲方（买受人）：华信制造有限公司
住所：江苏省苏州市
乙方（出卖人）：南通海拓润滑油有限公司
住所：江苏省南通市
签订地点：苏州
根据《中华人民共和国民法典》等有关法律法规，甲乙双方在平等、自愿、公平和诚信的基础上，经协商一致，订立本合同。
第一条 标的、数量和价款
本合同标的明细如下：
（一）品名：液压油；规格：L-HM46 200L；计量单位：桶；数量：200；单价：人民币2284元/桶（含税）；
（二）品名：不锈钢无缝管；规格：304 Φ25×2；计量单位：米；数量：50000；单价：人民币40.8元/米（含税）；
（三）品名：冷轧钢板；规格：SPCC 1.0mm；计量单位：吨；数量：50；单价：人民币4747元/吨（含税）；
（四）品名：三相异步电动机；规格：YE3-7.5kW；计量单位：台；数量：200；单价：人民币2743元/台（含税）；
以上各项合计，合同总额：人民币3282750元。
第二条 质量标准
乙方提供的货物应当符合国家标准、行业标准；双方另有技术要求的，以双方签字确认的书面技术文件为准。
第三条 交付
乙方应当在合同签订后三十日内向甲方交付货物，交付地点为甲方指定地点，运输费用由乙方承担。
第四条 检验与验收
甲方应当在收到货物之日起三十日内进行检验；发现数量或者质量不符合约定的，应当在该期限内书面通知乙方，乙方应当在收到通知后十日内更换、补足或者修复。甲方在该期限内未书面提出异议的，视为货物的数量和质量符合约定。
第五条 价款支付
合同签订后五日内，甲方向乙方支付合同总额的百分之三十作为预付款；余款在验收合格并收到乙方开具的合规发票后九十日内付清。
第六条 定金
甲方应当在合同签订后五日内向乙方支付合同总额百分之二十五的定金，定金在最后一期付款时抵作价款。一方违约时，对方可以选择适用定金条款或者违约金条款，但不得同时适用。
第七条 质量保证金
甲方有权从合同价款中预留合同总额的百分之十作为质量保证金，质保期为验收合格之日起二十四个月；质保期满且无质量问题的，甲方在十日内无息支付。
第八条 保密
双方对在履行本合同过程中知悉的对方商业秘密、技术资料和数据负有保密义务，未经对方书面同意不得向第三方披露；保密义务在本合同终止后五年内持续有效。
第九条 违约责任
甲方逾期付款的，每逾期一日，应当按合同总额的千分之一向乙方支付违约金，违约金总额不超过合同总额的百分之五十。乙方逾期交付的，每逾期一日，应当按合同总额的万分之三向甲方支付违约金，违约金总额不超过合同总额的百分之五。
第十条 责任限制
除因故意或者重大过失造成的损失，以及因侵犯知识产权、违反保密义务造成的损失外，任何一方在本合同项下的赔偿责任总额不超过合同总额，且不包括间接损失和可得利益损失。`;

  // 第 6 屏：V3-GOODS-12 的金额测算结果（run trace 1b8ba398165b）。金额、算式、原文摘录和假设均为运行输出原文。
  const MONEY = {
    worst: "384,706.94", sure: "151,631.69", exposure: "233,075.25",
    findings: [
      { clause: "第一条", type: "unit_price", level: "高" },
      { clause: "第四条", type: "inspection", level: "中" },
      { clause: "第六条", type: "deposit", level: "高" },
      { clause: "第九条", type: "penalty", level: "高" },
    ],
    items: [
      {
        clause: "第六条", title: "定金超过法定上限 20% 的部分", nature: "exposure", amount: "164,137.50",
        formula: "合同总额 3,282,750 ×（定金 25% − 上限 20%）= 164,137.50 元",
        inputs: [
          ["合同总额（元）= 3,282,750", "第一条", "以上各项合计，合同总额：人民币3282750元。"],
          ["定金比例 = 25%", "第六条", "甲方应当在合同签订后五日内向乙方支付合同总额百分之二十五的定金"],
        ],
        assumptions: ["定金上限 20%（《民法典》第五百八十六条、华信规范第十条）；超过的部分不产生定金效力，但钱已经付给对方"],
      },
      {
        clause: "第一条", title: "单价高于台账历史均价：本单多付", nature: "sure", amount: "124,920.00",
        formula: "液压油：（合同单价 2,284 − 台账均价 1,659.4）× 数量 200 = 124,920.00 元（单价高出 37.6%）",
        inputs: [["液压油的单价和数量 = 2,284 × 200", "第一条", "（一）品名：液压油；规格：L-HM46 200L；计量单位：桶；数量：200；单价：人民币2284元/桶（含税）；"]],
        assumptions: ["台账均价：供应商台账里同一品目历史成交单价的简单平均（液压油 10 笔）", "公司标准：单价高于台账均价 10% 以上才算超标（华信规范第四条）；没有超标的行不计入"],
      },
      {
        clause: "第九条", title: "违约金不对等：同样逾期，我方比对方多付", nature: "exposure", amount: "68,937.75",
        formula: "我方：合同总额 3,282,750 ×（日费率 0.1% × 30 天 = 3%）= 98,482.50；对方：合同总额 3,282,750 ×（日费率 0.03% × 30 天 = 0.9%）= 29,544.75；差额 68,937.75 元",
        inputs: [
          ["甲方逾期违约金日费率 = 0.1%", "第九条", "甲方逾期付款的，每逾期一日，应当按合同总额的千分之一向乙方支付违约金，违约金总额不超过合同总额的百分之五十。"],
          ["乙方逾期违约金日费率 = 0.03%", "第九条", "乙方逾期交付的，每逾期一日，应当按合同总额的万分之三向甲方支付违约金，违约金总额不超过合同总额的百分之五。"],
        ],
        more: "其余 3 个数字略",
        assumptions: ["情景：双方各逾期 30 天、逾期金额按合同总额计（假设，可配置）"],
      },
      {
        clause: "第五条", title: "付款条件的资金占用成本", nature: "sure", amount: "26,711.69", unlisted: true,
        formula: "合同总额 3,282,750 × 提前支付 55% ×（交付期 30 + 标准账期 60）÷ 365 × 6% = 26,711.69 元",
        inputs: [
          ["预付款比例 = 30%", "第五条", "甲方向乙方支付合同总额的百分之三十作为预付款"],
          ["定金比例 = 25%", "第六条", "甲方应当在合同签订后五日内向乙方支付合同总额百分之二十五的定金"],
        ],
        more: "其余 3 个数字略",
        assumptions: ["年化资金成本率 6%（假设）", "公司标准付款条件：不预付，验收合格后 60 日内付款（华信规范第七条）", "验收按交付当日完成计；定金按抵作价款计入提前支付的部分"],
      },
    ],
    unq: { clause: "第四条", label: "检验期过短或视为合格", reason: "检验期过短的后果是丧失质量异议权，损失取决于货物是否有质量问题" },
  };

  const RISK = {
    penalty: "违约金过高或只约束一方",
    inspection: "检验期过短或视为合格",
    deposit: "定金超过 20%",
    confidentiality: "保密缺失或不对等",
    unit_price: "单价高于台账历史价",
  };

  const FINDINGS = [
    {
      clause: "第四条", type: "inspection", level: "高", human: false, revised: true,
      quote: "乙方交付货物即视为甲方验收合格，甲方此后不得再就质量问题提出异议。",
      reason: "约定交付即视为验收合格，实质上取消了我方的检验期限和质量异议权。根据民法典第六百二十一条，检验期限的约定及买受人的通知义务是买受人权利的基础；本办法第十条明确不得接受“货物交付即视为质量合格”的条款，且第九条要求公司作为买方时到货后检验期不少于七日。",
      cites: ["C6", "C4", "C11"],
      suggestion: "第四条 检验与验收：甲方应在货物到达甲方指定地点后【七】日内，依照第二条约定的方式共同委托检验机构进行扦样检验。检验合格的，甲方出具验收合格确认；检验不合格或数量不符的，甲方有权在检验期内书面通知乙方，乙方应于收到通知后【五】日内更换或补足，并承担由此产生的检验费用和运费。甲方未在检验期内提出异议的，视为验收合格，但乙方隐瞒的瑕疵不受此限。",
    },
    {
      clause: "第六条", type: "deposit", level: "高", human: false, revised: true,
      quote: "甲方应当在合同签订后三日内向乙方支付合同总额百分之三十的定金。",
      reason: "依据民法典第五百八十六条，定金数额不得超过主合同标的额的百分之二十，超过部分不产生定金的效力，但该约定本身不利于我方，且会引发定金罚则适用争议。本办法第八条规定定金不得超过标的额20%，并且同时约定定金和违约金的应明确只能择一适用。",
      cites: ["C1", "C2", "C4"],
      suggestion: "第六条 定金：甲方应于合同签订后三日内向乙方支付定金人民币【232320】元（合同总额的百分之二十）。定金在乙方履行交货义务后抵作价款。乙方不履行合同的，应双倍返还定金；甲方不履行的，无权请求返还定金。定金与第八条逾期违约金择一适用。",
    },
    {
      clause: "第七条", type: "confidentiality", level: "高", human: true, revised: false,
      quote: "甲方对在履行本合同过程中知悉的乙方商业秘密、技术资料和数据负有永久保密义务；甲方违反保密义务的，应当向乙方支付违约金人民币五十万元。",
      reason: "保密义务只约束我方，乙方无对等义务，且无期限限制，违约金只对我方适用，属于只约束一方、只保护对方的不对等条款。叠加第九条“因违反保密义务造成的损失”不受责任上限约束，我方的潜在赔偿责任可能无限扩大。本办法第十二条要求违约条款双方对等，第十五条要求涉及公司采购渠道、价格信息的应约定对等保密义务。固定五十万元违约金是否过高，需结合实际损失判断。",
      cites: ["C4", "C1"],
      suggestion: "第七条 保密：双方对在履行本合同过程中知悉的对方商业秘密、技术资料和经营信息负有保密义务，未经对方书面同意不得向第三方披露或用于本合同之外的目的。保密期限为本合同终止后【三】年。一方违反保密义务的，应当赔偿对方因此遭受的实际损失，并承担违约责任。法律法规要求披露或司法机关要求的除外。",
    },
    {
      clause: "第一条", type: "unit_price", level: "中", human: true, revised: false,
      quote: "单价：人民币5808元/吨（含税）；合同总额：人民币1161600元。",
      reason: "台账显示同品目粳米历史成交均价为5213.6元/吨（10笔，purchase_history，tenant=ruifeng），本合同单价高于均价约11.4%（5808/5213.6-1），超过本办法第五条规定的8%阈值，但未超过15%阈值。业务部门需附市场行情说明，风控部复核线为15%，目前尚未触发。本条款判断取决于当期市场行情，需人工核实。",
      cites: ["T1", "C5", "C17"],
      suggestion: "第一条 单价：人民币【5213.6】元/吨（含税）以内，或附市场行情说明后经审批确定的价格；合同总额据此调整为人民币【1042720】元（200吨）。",
    },
  ];

  const SUMMARY = "我方为甲方（买受人）。主要风险：第四条“交付即视为验收合格”剥夺了检验与异议权，且与第二条的检验程序冲突；第六条定金达30%，超过法定上限20%；第七条保密义务只约束我方且永久有效，违约金只对我方适用，并通过第九条的责任例外放大风险；第一条单价较台账历史均价高约11.4%，需业务部门说明市场行情。供应商工商状态正常、无黑名单记录，资质有效期至2027-04-30，符合要求。";

  const FOLLOWUP = {
    q: "你列的第2条意见具体怎么改？",
    clause: "第六条",
    cites: ["C2", "C7", "C5", "C6"],
    a1: "第六条的问题是定金比例为合同总额的30%，超过了民法典第五百八十六条规定的20%上限，超过部分不产生定金效力，同时也与本公司规范第八条“定金与违约金须择一适用”的要求有关（合同第八条另有逾期违约金）。",
    a2: "修改建议：将定金比例降至合同总额的20%，即1161600元×20%=232320元，并明确定金与违约金的适用关系。可直接替换为：",
    rep: "第六条 定金：甲方应当在合同签订后三日内向乙方支付定金人民币232320元（合同总额的百分之二十）。定金在乙方履行交货义务后抵作价款。乙方不履行合同的，应当双倍返还定金；甲方不履行合同的，无权请求返还定金。本合同约定的定金与第八条逾期违约金择一适用，守约方应当在两者中明确选择其一主张。",
    a3: "说明：若按民法典第五百八十八条，既约定违约金又约定定金的，对方可以选择适用，但定金不足以弥补损失的，仍可请求超出部分的赔偿；为避免争议，建议在合同中明确择一适用。另外，定金数额最终是否需要保留，属于业务安排，可与业务部门确认。",
  };

  const CIV = "中华人民共和国民法典";
  const POLICY = "瑞丰贸易有限公司购销合同管理办法（构造）";
  const POLICY_TEXT = {
    "第一条": "为加强粮食及农产品购销、仓储物流合同管理，防范交易风险，制定本办法。",
    "第二条": "业务部门负责合同谈判和初审，风控部负责合同审查，单笔金额在一百万元以上的合同由总经理审批。",
    "第三条": "不得与列入公司黑名单的供应商或者客户签订合同。",
    "第四条": "供应商的粮食收购、食品经营等许可证应当在合同履行期内有效。",
    "第五条": "采购单价高于供应商台账同一品目近十二个月平均价百分之八的，业务部门应当附市场行情说明；高于百分之十五的，须经风控部复核。",
    "第六条": "公司作为买方时，付款期限不得超过货到验收合格后三十日。",
    "第七条": "不得约定以下游客户回款作为公司向供应商付款的条件，也不得接受客户以其上游回款作为向公司付款的条件。",
    "第八条": "约定定金的，定金不得超过合同标的额的百分之二十；同时约定定金和违约金的，应当明确只能择一适用。",
    "第九条": "粮食类标的物应当约定质量标准、检验机构和抽样方法；公司作为买方时，到货后检验期不少于七日。",
    "第十条": "不得接受“货物交付即视为质量合格”的条款。",
    "第十一条": "公司承担的逾期付款违约金，日比例不得高于万分之五；违约金总额不得超过合同总额的百分之二十。",
    "第十二条": "违约条款应当双方对等，不得只约定公司一方的违约责任。",
    "第十三条": "不得接受对方因自身原因造成货损、货差而免除赔偿责任的条款。",
    "第十四条": "长期供货合同不得约定对方可以无理由单方解除；仓储物流合同自动续期的，应当约定提前十五日书面通知不续期。",
    "第十五条": "合同涉及公司采购渠道、客户名单和价格信息的，应当约定对等的保密义务。",
  };
  const CIV_TEXT = [
    ["第六百一十七条", "出卖人交付的标的物不符合质量要求的，买受人可以依据本法第五百八十二条至第五百八十四条的规定请求承担违约责任。"],
    ["第六百一十八条", "当事人约定减轻或者免除出卖人对标的物瑕疵承担的责任，因出卖人故意或者重大过失不告知买受人标的物瑕疵的，出卖人无权主张减轻或者免除责任。"],
    ["第六百一十九条", "出卖人应当按照约定的包装方式交付标的物。对包装方式没有约定或者约定不明确，依据本法第五百一十条的规定仍不能确定的，应当按照通用的方式包装；没有通用方式的，应当采取足以保护标的物且有利于节约资源、保护生态环境的包装方式。"],
    ["第六百二十条", "买受人收到标的物时应当在约定的检验期限内检验。没有约定检验期限的，应当及时检验。"],
    ["第六百二十一条", "当事人约定检验期限的，买受人应当在检验期限内将标的物的数量或者质量不符合约定的情形通知出卖人。买受人怠于通知的，视为标的物的数量或者质量符合约定。"],
    ["", "当事人没有约定检验期限的，买受人应当在发现或者应当发现标的物的数量或者质量不符合约定的合理期限内通知出卖人。买受人在合理期限内未通知或者自收到标的物之日起二年内未通知出卖人的，视为标的物的数量或者质量符合约定；但是，对标的物有质量保证期的，适用质量保证期，不适用该二年的规定。"],
    ["", "出卖人知道或者应当知道提供的标的物不符合约定的，买受人不受前两款规定的通知时间的限制。"],
    ["第六百二十二条", "当事人约定的检验期限过短，根据标的物的性质和交易习惯，买受人在检验期限内难以完成全面检验的，该期限仅视为买受人对标的物的外观瑕疵提出异议的期限。"],
    ["", "约定的检验期限或者质量保证期短于法律、行政法规规定期限的，应当以法律、行政法规规定的期限为准。"],
    ["第六百二十三条", "当事人对检验期限未作约定，买受人签收的送货单、确认单等载明标的物数量、型号、规格的，推定买受人已经对数量和外观瑕疵进行检验，但是有相关证据足以推翻的除外。"],
  ];
  const CIV_DEPOSIT = [
    ["第五百八十五条", "当事人可以约定一方违约时应当根据违约情况向对方支付一定数额的违约金，也可以约定因违约产生的损失赔偿额的计算方法。"],
    ["", "约定的违约金低于造成的损失的，人民法院或者仲裁机构可以根据当事人的请求予以增加；约定的违约金过分高于造成的损失的，人民法院或者仲裁机构可以根据当事人的请求予以适当减少。"],
    ["", "当事人就迟延履行约定违约金的，违约方支付违约金后，还应当履行债务。"],
    ["第五百八十六条", "当事人可以约定一方向对方给付定金作为债权的担保。定金合同自实际交付定金时成立。"],
    ["", "定金的数额由当事人约定；但是，不得超过主合同标的额的百分之二十，超过部分不产生定金的效力。实际交付的定金数额多于或者少于约定数额的，视为变更约定的定金数额。"],
    ["第五百八十七条", "债务人履行债务的，定金应当抵作价款或者收回。给付定金的一方不履行债务或者履行债务不符合约定，致使不能实现合同目的的，无权请求返还定金；收受定金的一方不履行债务或者履行债务不符合约定，致使不能实现合同目的的，应当双倍返还定金。"],
  ];
  const CIV_SALE = CIV_TEXT.slice(0, 7);

  // 依据编号 → 原文视图。hl 为高亮的条（与检索到的片段对应）。
  const CITES = {
    C1: { kind: "law", title: CIV, path: "第三编 合同 › 第一分编 通则 › 第八章 违约责任", arts: "第五百八十五条、第五百八十六条、第五百八十七条", body: CIV_DEPOSIT, hl: ["第五百八十六条"] },
    C6: { kind: "law", title: CIV, path: "第三编 合同 › 第二分编 典型合同 › 第九章 买卖合同", arts: "第六百二十条、第六百二十一条、第六百二十二条", body: CIV_TEXT, hl: ["第六百二十条", "第六百二十一条"] },
    C7: { kind: "law", title: CIV, path: "第三编 合同 › 第二分编 典型合同 › 第九章 买卖合同", arts: "第六百一十六条至第六百二十一条", body: CIV_SALE, hl: ["第六百二十条", "第六百二十一条"] },
    C4: { kind: "policy", title: POLICY, path: "本公司审查规范 · 仅本租户可检索", arts: "第七条至第十五条", from: 7, to: 15, hl: ["第八条", "第九条", "第十条"] },
    C11: { kind: "policy", title: POLICY, path: "本公司审查规范 · 仅本租户可检索", arts: "第七条至第十五条", from: 7, to: 15, hl: ["第九条", "第十条"] },
    C5: { kind: "policy", title: POLICY, path: "本公司审查规范 · 仅本租户可检索", arts: "第一条至第八条", from: 1, to: 8, hl: ["第五条", "第八条"] },
    C17: { kind: "policy", title: POLICY, path: "本公司审查规范 · 仅本租户可检索", arts: "第一条至第八条", from: 1, to: 8, hl: ["第五条"] },
    C2: { kind: "template", title: "京津冀地区工业品买卖合同（BTHF-2023-0102）", path: "官方合同示范文本 · 市场监管总局合同示范文本库" },
    T1: { kind: "table" },
  };
  const CN_NUM = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五"];

  // ---------------- 小工具 ----------------
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (n) => `<i class="ph ph-${n}" aria-hidden="true"></i>`;
  const levelCls = (l) => (l === "高" ? "hi" : l === "中" ? "mid" : "lo");
  const CITE_LABEL = { C1: "民法典", C6: "民法典", C7: "民法典", C4: "公司规范", C5: "公司规范", C11: "公司规范", C17: "公司规范", C2: "示范文本", T1: "供应商台账" };
  const clauseTitle = (text, no) => { const m = text.split("\n").find((l) => l.startsWith(no + " ")); return m ? m.slice(no.length + 1) : ""; };

  function side(tenant, short) {
    return `<aside class="side" aria-label="侧栏">
      <div class="brand"><span class="mark">${icon("scales")}</span>采购合同审查</div>
      <div class="ws"><span class="av">${short}</span><span class="t"><small>当前公司</small><b>${tenant}</b></span>${icon("caret-up-down")}</div>
      <nav class="snav" aria-label="主导航">
        <span class="h">工作台</span>
        <a class="on">${icon("shield-check")}合同审查</a>
        <a>${icon("book-open-text")}法规问答</a>
        <span class="h">质量</span>
        <a>${icon("chart-bar")}评测看板</a>
        <a>${icon("coins")}成本与延迟</a>
      </nav>
      <div class="foot">${icon("info")}<span>演示用的公司、审查规范和供应商台账都是构造的</span></div>
    </aside>`;
  }

  function head({ crumb, title, code, acts = "" }) {
    return `<header class="head"><div><div class="crumb">${crumb}</div><h1>${title}${code ? `<span class="code">${code}</span>` : ""}</h1></div><div class="acts">${acts}</div></header>`;
  }

  function paperHTML(text, { findings = [], active = null, blanks = false, hint = "", money = {} } = {}) {
    const lines = text.split("\n");
    const byClause = {};
    findings.forEach((f) => (byClause[f.clause] = [...(byClause[f.clause] || []), f]));
    let html = hint ? `<p class="paper-hint">${icon("info")}${hint}</p>` : "";
    html += `<div class="paper">`;
    let cur = null;
    const flush = () => {
      if (!cur) return;
      const fs = byClause[cur.no];
      const top = fs && fs.slice().sort((a, b) => "高中低".indexOf(a.level) - "高中低".indexOf(b.level))[0];
      const m = money[cur.no];
      const cls = ["clause", top ? `risk r-${levelCls(top.level)}` : m ? "risk r-money" : "", cur.no === active ? "active" : ""].join(" ");
      const tags = [...(fs || []).map((f) => `<span>${RISK[f.type]} · ${f.level}风险</span>`), ...(m ? [`<span class="yuan">${m}</span>`] : [])];
      html += `<div class="${cls}" data-clause="${cur.no}"><p class="h">${esc(cur.head)}</p>${cur.body.map((b) => `<p>${esc(b)}</p>`).join("")}${
        tags.length ? `<p class="tags">${tags.join("")}</p>` : ""
      }</div>`;
      cur = null;
    };
    lines.forEach((l, i) => {
      const m = l.match(/^(第[一二三四五六七八九十]+条)\s/);
      if (m) { flush(); cur = { no: m[1], head: l, body: [] }; return; }
      if (cur) { cur.body.push(l); return; }
      let t = esc(l);
      if (blanks) t = t.replace(/(_{4,}(（待填）)?)/g, '<span class="blank">$1</span>');
      html += i === 0 ? `<p class="title">${t}</p>` : i === 1 ? `<p class="no">${t}</p>` : `<p>${t}</p>`;
    });
    flush();
    return html + `</div>`;
  }

  const citeBtn = (c, on) => `<button class="cite ${c[0] === "T" ? "t" : ""} ${on ? "on" : ""}" data-cite="${c}" aria-label="查看依据 ${c}"><b>${c}</b>${CITE_LABEL[c] || ""}</button>`;

  function findingHTML(f, i, { focusCite = null, focus = false, picked = null } = {}) {
    return `<article class="card fcard lv-${levelCls(f.level)} ${focus ? "focus" : ""}" aria-label="意见 ${i + 1}">
      <header class="fhead">
        <span class="fno">${String(i + 1).padStart(2, "0")}</span>
        <div class="ftitle">
          <span class="c" data-goto="${f.clause}">${f.clause}<small>${clauseTitle(AGRI, f.clause)}</small></span>
          <div class="ftags"><span class="tag">${RISK[f.type]}</span>${f.human ? `<span class="tag human">${icon("user-check")}转法务复核</span>` : ""}</div>
        </div>
        <span class="lvl ${levelCls(f.level)}">${f.level}风险</span>
      </header>
      <blockquote class="quote">“${esc(f.quote)}”</blockquote>
      <p class="reason">${esc(f.reason)}</p>
      <div class="basis"><span class="lab">依据</span>${f.cites.map((c) => citeBtn(c, c === focusCite)).join("")}</div>
      ${f.revised ? `<p class="vnote">${icon("seal-check")}理由已由校验器改写为只保留有原文依据的部分。</p>` : ""}
      <div class="suggest">
        <div class="bar"><span>${icon("pencil-simple-line")}修改建议</span><button data-copy>${icon("copy")}复制</button></div>
        <p>${esc(f.suggestion)}</p>
      </div>
      <footer class="fb"><span>这条意见</span>${["有用", "没用", "不是风险", "看不懂"].map((t) => `<button aria-pressed="${picked === t}">${t}</button>`).join("")}${picked ? `<span class="ok">${icon("check")}已记录</span>` : ""}</footer>
    </article>`;
  }

  function verdict() {
    const n = (l) => FINDINGS.filter((f) => f.level === l).length;
    return `<section class="card verdict" aria-label="审查结论">
      <div class="top"><b>审查结论</b><span>我方：甲方（买受人）</span></div>
      <div class="stats">
        <div class="stat hi"><b>${n("高")}</b><span>高风险</span></div>
        <div class="stat mid"><b>${n("中")}</b><span>中风险</span></div>
        <div class="stat human"><b>${FINDINGS.filter((f) => f.human).length}</b><span>转法务复核</span></div>
      </div>
      <p>${esc(SUMMARY)}</p>
      <div class="vfoot">${icon("seal-check")}依据校验已完成，2 条理由按原文依据改写</div>
    </section>`;
  }

  const traceLine = (steps, sec, usd) => `<div class="trace">${icon("caret-right")}Agent 过程 ${steps} 步 · 共 ${sec} 秒 · ${usd}</div>`;
  const composer = () => `<form class="composer" data-composer onsubmit="return false"><div class="box"><span class="in" role="textbox" aria-label="追问">追问，例如：你列的第 2 条意见怎么改？/ 换成乙方视角再看一遍</span><button class="send" type="submit" aria-label="发送">${icon("arrow-up")}</button></div></form>`;

  function sourceHTML(id) {
    const c = CITES[id];
    const head = (title, path, extra = "") => `<div class="src-head">
      <div class="id"><b>${id}</b>${c.kind === "table" ? "查表结果 · MetricLens MCP，只读" : "依据原文"}</div>
      <h3>${esc(title)}</h3><div class="path">${esc(path)}${extra}</div>
      <button class="x" data-close aria-label="关闭原文">${icon("x")}</button></div>`;
    if (c.kind === "table") {
      return `${head("供应商台账：历史成交价", "租户 ruifeng · 同品目历史成交记录")}
        <div class="scroll"><div class="sqlbox">SELECT AVG(unit_price_yuan) AS avg_price,
       COUNT(*) AS n
FROM purchase_history
WHERE tenant='ruifeng' AND item LIKE '%粳米%'</div>
        <table class="tbl"><thead><tr><th>avg_price</th><th>n</th></tr></thead><tbody><tr><td>5213.6</td><td>10</td></tr></tbody></table>
        <p class="calc">合同单价 5808 元/吨，比台账均价高约 11.4%（5808 / 5213.6 - 1）。规范第五条：高于 8% 要附市场行情说明，高于 15% 须风控部复核。</p>
        <div class="src-body"><p class="muted">租户由会话注入，模型改不了；SQL 只读执行，只看得到本租户的行。</p></div></div>`;
    }
    if (c.kind === "template") {
      return `${head(c.title, c.path)}<div class="scroll"><div class="src-body">
        <p class="muted">示范文本官网只写了“版权所有”，原文只在本地部署时入库和显示，作品集原型中不展示。</p></div></div>`;
    }
    let body = "";
    if (c.kind === "law") {
      let last = false;
      body = c.body.map(([no, t]) => { if (no) last = c.hl.includes(no); return `<p class="${last ? "hl" : ""}">${no ? `<span class="h">${no}</span>　` : ""}${esc(t)}</p>`; }).join("");
    } else {
      for (let k = c.from; k <= c.to; k++) {
        const no = `第${CN_NUM[k]}条`;
        body += `<p class="${c.hl.includes(no) ? "hl" : ""}"><span class="h">${no}</span>　${esc(POLICY_TEXT[no])}</p>`;
      }
    }
    return `${head(c.title, c.path, `<br>${esc(c.arts)}`)}<div class="scroll"><div class="src-body">${body}</div></div>`;
  }

  const NATURE = { sure: "不改就确定多花", exposure: "最坏情景下的敞口" };
  function moneyHTML(open = -1) {
    return `<section class="card money" aria-label="金额汇总">
        <div class="top"><b>按现在的条款签，最坏情况多花</b><span>金额由规则代码计算 · 抄出的数字逐个核对原文</span></div>
        <div class="total">¥${MONEY.worst}</div>
        <div class="msplit">
          <div class="ms sure"><span>${NATURE.sure}</span><b>¥${MONEY.sure}</b><small>比价多付、资金占用，照此履行就发生</small></div>
          <div class="ms expo"><span>${NATURE.exposure}</span><b>¥${MONEY.exposure}</b><small>定金、违约金，有一方违约才发生</small></div>
        </div>
        <div class="unqline unq">${icon("prohibit")}<span>另有 1 条无法量化，不估金额：<span class="c" data-goto="${MONEY.unq.clause}">${MONEY.unq.clause}</span> 检验期（损失取决于货物是否有质量问题）</span></div>
      </section>
      <section class="card prio" aria-label="谈判优先级">
        <div class="top"><b>谈判优先级</b><span>按金额从大到小 · 点开看合同出处和假设</span></div>
        ${MONEY.items.map((it, i) => `<div class="prow ${i === open ? "open" : ""}">
          <button class="phead" data-prio="${it.clause}" aria-expanded="${i === open}">
            <span class="rk">${i + 1}</span>
            <span class="pt"><strong>${it.clause}　${it.title}</strong><span class="formula">${esc(it.formula)}</span></span>
            <span class="pr"><span class="amt">¥${it.amount}</span><small class="${it.nature}">${NATURE[it.nature]}${it.unlisted ? " · 未列为风险" : ""}</small></span>${icon("caret-down")}
          </button>
          <div class="pdetail">
            <div class="pin-list"><span class="lab">用到的合同数字</span>${it.inputs.map(([l, c, q]) => `<p><b>${esc(l)}</b><span class="c" data-goto="${c}">${c}</span><q>${esc(q)}</q></p>`).join("")}${it.more ? `<p class="muted">${it.more}</p>` : ""}</div>
            <div class="assume"><span class="lab">假设</span>${it.assumptions.map((a) => `<p>${esc(a)}</p>`).join("")}</div>
          </div>
        </div>`).join("")}
      </section>`;
  }

  const RUIFENG = ["瑞丰贸易有限公司（构造）", "瑞"];
  const reviewHead = (extra = "") => head({
    crumb: `合同审查 ${icon("caret-right")} 农产品买卖合同`, title: "农产品买卖合同", code: "AGRI-R4",
    acts: `<span class="meta">${icon("user-circle")}我方：甲方（买受人）</span>${extra}<button class="btn" data-go="1">${icon("arrow-counter-clockwise")}换一份合同</button>`,
  });

  // ---------------- 五屏 ----------------
  const SCREENS = [
    {
      name: "提交合同",
      build: () => `${side(...RUIFENG)}
        <main class="main">
          ${head({ crumb: `合同审查 ${icon("caret-right")} 新建`, title: "新建审查" })}
          <div class="body newgrid">
            <section class="card form" aria-label="合同">
              <div class="row2">
                <div class="field"><label>我方公司</label><div class="select">${icon("buildings")}瑞丰贸易有限公司（构造）${icon("caret-down")}</div></div>
                <div class="field"><label>示例合同</label><div class="select">${icon("file-text")}AGRI-R4 · 农产品买卖合同${icon("caret-down")}</div></div>
              </div>
              <div class="seg"><span>${icon("clipboard-text")}粘贴文本</span><span class="on">${icon("files")}载入示例（构造）</span></div>
              <div class="sheet">${AGRI.split("\n").map((l) => `<p>${esc(l)}</p>`).join("")}<span class="count">${AGRI.length} / 20000</span></div>
              <div class="formfoot"><span class="hint">${icon("info")}条款以“第一条”“第二条”开头，系统会逐条定位</span><button class="btn primary lg" data-start>${icon("shield-check")}开始审查</button></div>
            </section>
            <div class="side-col" data-right>
              <section class="card scope" aria-label="审查范围">
                <div><h4>${icon("files")}覆盖的合同类型 <em>7</em></h4><div class="chips">${["工业品买卖", "农产品买卖", "加工承揽", "仓储委托", "数据委托处理", "数据产品开发", "数据供应"].map((t) => `<span class="chip">${t}</span>`).join("")}</div></div>
                <div class="div"></div>
                <div><h4>${icon("list-checks")}识别的风险类型 <em>11</em></h4><div class="chips">${["违约金过高或不对等", "免责与责任限制", "单方解除", "检验期过短", "付款条件不利", "保密缺失或不对等", "知识产权归属不利", "管辖不利", "自动续约", "定金超过 20%", "单价高于台账均价"].map((t) => `<span class="chip">${t}</span>`).join("")}</div></div>
                <div class="div"></div>
                <div><h4>${icon("currency-cny")}金额测算 <em>5</em></h4><div class="chips">${["比价多付", "付款条件的资金占用", "违约金", "定金超过 20% 的部分", "质保金"].map((t) => `<span class="chip">${t}</span>`).join("")}</div></div>
                <div class="div"></div>
                <div><h4>${icon("book-open-text")}依据来源</h4><div class="chips">${["《民法典》", "合同编通则解释", "《民事诉讼法》", "官方示范文本", "本公司审查规范", "供应商台账"].map((t) => `<span class="chip">${t}</span>`).join("")}</div></div>
              </section>
              <section class="card notice">${icon("warning-circle")}<span>审查结果不构成法律意见，不替代律师和法务的最终判断。范围之外的合同和风险，系统不会主动提示。</span></section>
              <button class="card linkbtn" data-go="2">${icon("question")}<span>当事人名称空白的合同会怎样？<small>看 GOODS-R3 的处理方式</small></span>${icon("arrow-right")}</button>
            </div>
          </div>
        </main>`,
      notes: {
        title: "提交合同",
        lead: "选我方公司，粘贴合同或载入构造的示例合同。对应 PRD 第 4 节流程第 1 步。",
        items: [
          { sel: ".field .select", at: "tl", t: "先选“我方公司”", d: "每家公司只能检索到自己的审查规范和供应商台账。不同公司的红线不同，混在一起会给出错误的依据。", s: "PRD 第 7 节；问题日志 P21 修复过一次跨租户读数据的漏洞" },
          { sel: ".scope", at: "tl", t: "提交前写清覆盖范围", d: "PRD 风险一节提到“过度依赖”：用户可能只看系统列出的问题。所以提交页就列出 7 类合同、11 类风险、5 项金额测算和依据来源。", s: "设计提案，对应 PRD 第 5、8 节；现有前端只在首屏说明里提到" },
          { sel: ".notice", at: "tl", t: "免责放在动作旁边", d: "“不构成法律意见”放在开始审查之前，而不是藏在页脚。", s: "PRD 第 8 节" },
          { sel: ".sheet", at: "tr", t: "合同按纸张排版", d: "正文用宋体，接近用户平时看到的合同，减少“这是机器文本”的距离感。示例合同都是构造的。", s: "evals/README.md" },
        ],
      },
    },
    {
      name: "立场反问",
      build: () => `${side("华信制造有限公司（构造）", "华")}
        <main class="main">
          ${head({ crumb: `合同审查 ${icon("caret-right")} 工业品买卖合同`, title: "工业品买卖合同", code: "GOODS-R3", acts: `<span class="meta wait">${icon("hourglass-medium")}等待确认我方立场</span><button class="btn" data-go="1">${icon("arrow-counter-clockwise")}换一份合同</button>` })}
          <div class="body" style="grid-template-columns: minmax(0,1fr) 560px">
            <section class="pane desk" aria-label="合同原文"><div class="scroll">${paperHTML(GOODS, { blanks: true, hint: "红色标出的是合同里空着的当事人信息" })}</div></section>
            <section class="pane panel" aria-label="审查">
              <div class="scroll"><div class="stack">
                <div class="card clarify">
                  <span class="qi">${icon("question")}</span>
                  <h3>我方是甲方还是乙方？</h3>
                  <p>合同首部甲乙双方名称均为空白（“待填”），无法判断华信制造有限公司是甲方（买受人）还是乙方（出卖人）。请确认我方在本合同中的身份，并补充双方名称后再审查。</p>
                  <div class="opts">
                    <button class="opt" data-side>${icon("shopping-cart")}<span><b>我方是甲方</b><small>买受人，付款收货</small></span></button>
                    <button class="opt" data-side>${icon("package")}<span><b>我方是乙方</b><small>出卖人，交货收款</small></span></button>
                  </div>
                </div>
                ${traceLine(1, "2.1", "$0.00036")}
                <div class="card why"><b>${icon("lightbulb")}为什么先问</b><span>立场判断错了，整份意见都会反过来：对甲方不利的条款，往往正是对乙方有利的条款。</span></div>
              </div></div>
              ${composer()}
            </section>
          </div>
        </main>`,
      notes: {
        title: "看不出立场时先反问",
        lead: "当事人名称空白的合同（GOODS-R3），系统不猜我方是甲方还是乙方。对应 PRD 第 4 节流程第 2 步。",
        items: [
          { sel: ".clarify h3", at: "l", t: "只问一个问题", d: "看不出立场时只问一件事，并说明为什么问。", s: "PRD 第 7 节；构造评测集上当事人空白时反问率 100%、多余反问 0%" },
          { sel: ".opts .opt", at: "tl", t: "一键回答", d: "两个按钮直接发出“我方是甲方。”或“我方是乙方。”，回答后带着上下文重新审查。按钮下的一行小字帮用户确认自己是哪一方。", s: "现有前端的 clarify 分支；副标题是设计提案" },
          { sel: ".pane .trace", at: "l", t: "反问很便宜", d: "这一轮只调用 1 步模型，耗时 2.1 秒、花费 $0.00036，比审错一整份合同的代价小得多。", s: "演示运行记录" },
          { sel: ".paper .blank", at: "r", t: "原文标出缺失处", d: "空白的当事人名称标红，用户一眼看到系统为什么问。", s: "设计提案" },
        ],
      },
    },
    {
      name: "逐条意见",
      build: () => `${side(...RUIFENG)}
        <main class="main">
          ${reviewHead(`<span class="meta">${icon("list-bullets")}4 条意见</span>`)}
          <div class="body" style="grid-template-columns: minmax(0,1fr) 640px">
            <section class="pane desk" aria-label="合同原文"><div class="scroll" data-contract>${paperHTML(AGRI, { findings: FINDINGS, active: "第四条", hint: "高亮按“我方是甲方”的审查结果，点条款查看对应意见" })}</div></section>
            <section class="pane panel" aria-label="审查意见">
              <div class="scroll" data-findings><div class="stack">
                ${verdict()}
                <button class="card linkbtn" data-go="6">${icon("currency-cny")}<span>每条风险值多少钱、先谈哪条？<small>这份运行记录早于金额测算，金额看第 6 屏 V3-GOODS-12</small></span>${icon("arrow-right")}</button>
                ${FINDINGS.map((f, i) => findingHTML(f, i, { focus: i === 0 })).join("")}
                ${traceLine(2, "51.0", "$0.00635")}
              </div></div>
              ${composer()}
            </section>
          </div>
        </main>`,
      notes: {
        title: "逐条风险意见",
        lead: "AGRI-R4 的真实输出：4 条意见（高 3、中 1）。每条有条款位置、风险类型、等级、理由、依据、可替换的修改建议。对应 PRD 第 4 节第 3 步。",
        items: [
          { sel: ".verdict .stats", at: "tl", t: "结论先行", d: "先给立场、等级计数和一段总结。业务负责人第一件事是决定要不要找对方改、要不要报给领导。", s: "PRD 第 3 节：目标用户最在意快、看得懂" },
          { sel: ".clause.r-mid", at: "tl", t: "原文按最高等级标记", d: "有风险的条款在纸张左侧画色条、底色变浅，点意见里的条款号会跳回原文。", s: "现有前端 ContractView" },
          { sel: ".fcard.focus .basis", at: "l", t: "依据直接写来源", d: "依据按钮写成“C6 民法典”“C4 公司规范”，不点开也知道是法条还是公司规定。", s: "设计提案；编号与运行记录一致" },
          { sel: ".fcard.focus .vnote", at: "l", t: "校验器改过的理由要说出来", d: "依据校验把理由里找不到原文依据的部分删掉，并在卡片上写明。无依据又没标转人工的意见从 6.6% 降到 0.8%。", s: "ADR 008；构造数据" },
        ],
      },
    },
    {
      name: "依据原文",
      build: (opt = {}) => {
        const cite = opt.cite || "C6";
        const fi = FINDINGS.findIndex((f) => f.cites.includes(cite));
        const f = FINDINGS[fi < 0 ? 0 : fi];
        return `${side(...RUIFENG)}
        <main class="main">
          ${reviewHead()}
          <div class="body" style="grid-template-columns: minmax(0,1fr) 600px">
            <section class="pane panel" aria-label="审查意见">
              <div class="scroll" data-findings><div class="stack">
                ${verdict()}
                ${FINDINGS.map((x, i) => findingHTML(x, i, { focus: x === f, focusCite: x === f ? cite : null })).join("")}
              </div></div>
              ${composer()}
            </section>
            <aside class="pane src" aria-label="依据原文">${sourceHTML(cite)}</aside>
          </div>
        </main>`;
      },
      notes: {
        title: "点依据看原文高亮",
        lead: "点意见 01 的“C6 民法典”，右侧打开《民法典》买卖合同一章，高亮第六百二十条、第六百二十一条。对应 PRD 第 4 节第 4 步。",
        items: [
          { sel: ".src .hl", at: "tl", t: "依据可以当场核实", d: "竞品公开资料里几乎都没写明会展示法条原文。让用户自己看到原文，是和通用聊天机器人的主要区别。", s: "竞品分析观察 2；构造集上依据引用准确率 v1 100%" },
          { sel: ".src-head h3", at: "l", t: "法条、规范、台账同一个视图", d: "公司规范打开的是本公司审查办法，供应商台账打开的是查询 SQL 和结果。可以在原型里点其他依据切换。", s: "看原文时合同正文暂时收起，保证两栏都读得清，属设计提案" },
          { sel: ".fcard.focus .cite.on", at: "tr", t: "高亮落在检索到的片段上", d: "高亮的是 Agent 实际检索到、并在理由里引用的条文，不是事后补的链接。", s: "依据校验规则层：点名的条文必须真被检索到" },
          { sel: ".fcard.focus .suggest", at: "tr", t: "改法可以直接替换", d: "修改建议是能直接放进合同的条款文本，不是“建议协商”，带“复制”按钮。", s: "PRD 第 3 节：改法能直接用" },
        ],
      },
    },
    {
      name: "追问与转人工",
      build: () => `${side(...RUIFENG)}
        <main class="main">
          ${reviewHead(`<span class="meta">${icon("list-bullets")}4 条意见</span><span class="meta human-meta">${icon("user-check")}2 条转法务复核</span>`)}
          <div class="body" style="grid-template-columns: minmax(0,1fr) 640px">
            <section class="pane desk" aria-label="合同原文"><div class="scroll" data-contract data-scroll-to="第六条">${paperHTML(AGRI, { findings: FINDINGS, active: "第六条", hint: "高亮按“我方是甲方”的审查结果，点条款查看对应意见" })}</div></section>
            <section class="pane panel" aria-label="审查意见">
              <div class="scroll" data-findings data-scroll-bottom><div class="stack">
                ${verdict()}
                ${FINDINGS.map((f, i) => findingHTML(f, i, { picked: i === 3 ? "有用" : null })).join("")}
                ${traceLine(2, "51.0", "$0.00635")}
                <div class="ask">${esc(FOLLOWUP.q)}</div>
                <div class="card answer">
                  <div class="ah">${icon("arrow-bend-down-right")}定位到 <span class="c" data-goto="${FOLLOWUP.clause}">${FOLLOWUP.clause} ${clauseTitle(AGRI, FOLLOWUP.clause)}</span></div>
                  <p>${esc(FOLLOWUP.a1)}</p><p>${esc(FOLLOWUP.a2)}</p>
                  <p class="rep">${esc(FOLLOWUP.rep)}</p>
                  <p>${esc(FOLLOWUP.a3)}</p>
                  <div class="basis"><span class="lab">依据</span>${FOLLOWUP.cites.map((c) => citeBtn(c, false)).join("")}</div>
                </div>
                ${traceLine(2, "9.4", "$0.00207")}
              </div></div>
              ${composer()}
            </section>
          </div>
        </main>`,
      notes: {
        title: "追问，拿不准的交给法务",
        lead: "用户问“你列的第 2 条意见具体怎么改？”，系统定位到第六条并给出可替换条款。单价那条判断取决于市场行情，标了转法务复核。对应 PRD 第 4 节第 5、7 步。",
        items: [
          { sel: ".ask", at: "l", t: "追问带着上一轮的审查", d: "“第 2 条”指的是上一轮意见列表里的第 2 条。带历史时这类回指题答对 8/8，不带历史 0/8；“换成乙方视角再看一遍”6/6 正确切换。", s: "README 多轮追问评测；构造数据" },
          { sel: ".human-meta", at: "tl", t: "拿不准的不删，标转法务复核", d: "单价比台账均价高 11.4%，落在公司规范 8% 到 15% 之间，合不合理取决于当期行情。系统给出数据和规范，把决定留给人。", s: "PRD 第 7 节" },
          { sel: ".clause.active", at: "tl", t: "回答里的条款号联动原文", d: "回答定位到第六条，左侧原文同步选中，用户不用自己找。", s: "现有前端 answer_clause" },
          { sel: ".stack > article:nth-of-type(4) .fb", at: "l", t: "四档打标，变成改进方向", d: "有用 / 没用 / 不是风险 / 看不懂。只记标签和意见的条款、类型、等级，不记合同原文；用来算采纳率和误报反馈率，每条“不是风险”都回到原文看原因。", s: "PRD 第 6 节；用户试用方案第 4 到 6 节" },
        ],
      },
    },
    {
      name: "金额与优先级",
      build: () => `${side("华信制造有限公司（构造）", "华")}
        <main class="main">
          ${head({ crumb: `合同审查 ${icon("caret-right")} 工业品买卖合同`, title: "工业品买卖合同", code: "V3-GOODS-12", acts: `<span class="meta">${icon("user-circle")}我方：甲方（买受人）</span><span class="meta">${icon("list-bullets")}4 条意见</span><span class="meta money-meta">${icon("currency-cny")}4 项金额</span><button class="btn" data-go="1">${icon("arrow-counter-clockwise")}换一份合同</button>` })}
          <div class="body" style="grid-template-columns: minmax(0,1fr) 640px">
            <section class="pane desk" aria-label="合同原文"><div class="scroll" data-contract data-scroll-to="第六条">${paperHTML(GOODS12, { findings: MONEY.findings, active: "第六条", hint: "条款下方标出风险等级和测算金额；正文只展示到第十条", money: { "第一条": "多付 ¥124,920.00", "第四条": "无法量化", "第五条": "未列为风险 · 多占用资金 ¥26,711.69", "第六条": "敞口 ¥164,137.50", "第九条": "敞口 ¥68,937.75" } })}</div></section>
            <section class="pane panel" aria-label="金额与谈判优先级">
              <div class="scroll" data-findings><div class="stack">
                ${moneyHTML()}
                <div class="trace">${icon("caret-right")}9 次模型调用 · 共 48.1 秒 · $0.01403；其中金额测算 1 次、3.9 秒、$0.00074，与三个审查员并行</div>
              </div></div>
              ${composer()}
            </section>
          </div>
        </main>`,
      notes: {
        title: "每条风险算成钱，按金额排优先级",
        lead: "V3-GOODS-12 的真实输出（构造的 4 行标的采购合同）：4 项金额，其中第五条的付款条件没有被报成风险，但预付款加定金占 55%，多占用资金，也列进来。对应 PRD 第 4 节第 6 到 8 步。",
        items: [
          { sel: ".money .top b", at: "l", t: "先回答“最坏多花多少、先谈哪条”", d: "高 / 中 / 低回答不了两条“高”哪条更要紧。汇总区给合计，下面按金额排出谈判顺序。", s: "PRD 第 2 节，标了【假设】：用户是否按金额排序去谈，要靠试用验证" },
          { sel: ".money .msplit", at: "tl", t: "两种钱分开放", d: "“确定多花”照现在的条款履行就会发生；“敞口”要有一方违约才发生。只显示一个合计，会被读成“一定损失这么多”。", s: "ADR 014 决定 6；PRD 第 8 节“金额被当成精确预测”" },
          { sel: ".prow .rk", at: "l", t: "金额由规则算，带算式、原文和假设", d: "错的金额比没有金额危害更大：采购会拿着它去谈判。模型只抄数字，规则代码核对原文后计算。60 份留出合同 133 个测算项算对 133 和 132 个，未出现错误金额。", s: "ADR 014；构造数据，留出集与调试集出自同一个生成器" },
          { sel: ".unqline", at: "l", t: "算不了的标“无法量化”", d: "检验期、管辖、保密这类风险没有确定的数，写明原因，不估。留出集 26 个算不了的条款（背靠背付款、按实际损失计的违约金等）全部标对。", s: "PRD 第 5 节“不做”；ADR 014 决定 5" },
        ],
      },
    },
  ];

  // ---------------- 渲染与交互 ----------------
  const params = new URLSearchParams(location.search);
  const exportMode = params.has("export");
  if (exportMode) document.body.classList.add("export");

  const frame = $("#frame");
  const notesEl = $("#notes");
  let current = 1;

  function setNotes(on) {
    document.body.classList.toggle("show-notes", on);
    const t = $("#notes-toggle");
    if (t) t.setAttribute("aria-pressed", String(on));
    fit();
    placePins(SCREENS[current - 1].notes.items);
  }

  function render(n, opt = {}) {
    current = Math.min(SCREENS.length, Math.max(1, n));
    const S = SCREENS[current - 1];
    frame.innerHTML = `<section class="screen on" data-s="${current}">${S.build(opt)}</section><div class="toast" id="toast"></div>`;
    notesEl.innerHTML = `<h3>${current}. ${S.notes.title}</h3><p class="lead">${S.notes.lead}</p>${S.notes.items
      .map((it, i) => `<div class="note"><span class="n">${i + 1}</span><div><strong>${it.t}</strong>${it.d}<span class="src">${it.s}</span></div></div>`)
      .join("")}`;
    $$(".steps button").forEach((b) => b.setAttribute("aria-current", String(+b.dataset.s === current)));
    const toClause = $("[data-scroll-to]", frame);
    if (toClause) scrollClause(toClause.dataset.scrollTo, false);
    const bottom = $("[data-scroll-bottom]", frame);
    if (bottom) { const fb4 = $(".stack > article:nth-of-type(4) .fb", bottom); bottom.scrollTop = fb4 ? fb4.getBoundingClientRect().top - bottom.getBoundingClientRect().top + bottom.scrollTop - 16 : bottom.scrollHeight; }
    if (current === 3) {
      const fs = $("[data-findings]", frame);
      const v = $(".verdict", frame);
      if (fs && v) fs.scrollTop = 0;
    }
    if (current === 4) {
      const hl = $(".src-body .hl", frame);
      const box = hl && hl.closest(".scroll");
      if (box) box.scrollTop = Math.max(0, hl.offsetTop - 110);
      const fc = $(".fcard.focus", frame);
      const fs = $("[data-findings]", frame);
      if (fc && fs) fs.scrollTop = Math.max(0, fc.offsetTop - 16);
    }
    placePins(S.notes.items);
    if (!exportMode) history.replaceState(null, "", `?s=${current}${opt.cite ? `&cite=${opt.cite}` : ""}`);
  }

  // 注释编号钉在对应元素的边上（按元素实际位置计算，画板缩放后也对得上）
  function placePins(items) {
    $$(".pin", frame).forEach((p) => p.parentNode.removeChild(p));
    const fr = frame.getBoundingClientRect();
    const k = fr.width / 1440 || 1;
    items.forEach((it, i) => {
      const el = $(it.sel, frame);
      if (!el) return;
      const r = el.getBoundingClientRect();
      let x = (r.left - fr.left) / k, y = (r.top - fr.top) / k;
      const w = r.width / k, h = r.height / k;
      if (it.at === "tr") x += w;
      if (it.at === "l") { x -= 22; y += h / 2; }
      if (it.at === "r") { x += w + 22; y += h / 2; }
      const box = el.closest(".scroll");
      if (box) { const b = box.getBoundingClientRect(); const ty = r.top + (it.at === "l" || it.at === "r" ? r.height / 2 : 0); if (ty < b.top + 4 || ty > b.bottom - 8) return; }
      if (y > 890) return;
      const p = document.createElement("span");
      p.className = "pin";
      p.textContent = i + 1;
      p.style.left = Math.round(Math.min(1412, Math.max(4, x - 12))) + "px";
      p.style.top = Math.round(Math.max(4, y - 12)) + "px";
      frame.appendChild(p);
    });
  }

  function scrollClause(no, smooth = true) {
    const el = $(`.clause[data-clause="${no}"]`, frame);
    const box = $("[data-contract]", frame);
    if (!el || !box) return;
    $$(".clause.active", frame).forEach((c) => c.classList.remove("active"));
    el.classList.add("active");
    const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop;
    box.scrollTo({ top: Math.max(0, top - box.clientHeight / 2 + el.clientHeight / 2), behavior: smooth ? "smooth" : "auto" });
  }

  function toast(msg) {
    const t = $("#toast");
    t.innerHTML = `${icon("check-circle")}${msg}`;
    t.classList.add("on");
    clearTimeout(toast.h);
    toast.h = setTimeout(() => t.classList.remove("on"), 1800);
  }

  function runProgress() {
    const right = $("[data-right]", frame);
    const rows = ["通读合同、检索依据中…", "第 1 步完成：已检索 6 次，继续审查…", "正在核对每条意见的依据…"];
    let k = 0;
    const draw = () => {
      right.innerHTML = `<div class="card progress">${rows
        .map((r, i) => `<div class="row ${i < k ? "done" : i === k ? "now" : ""}"><span class="ic">${i < k ? icon("check") : ""}</span>${r}</div>`)
        .join("")}</div><div class="card" style="padding:20px;display:grid;gap:12px"><div class="skel" style="width:40%"></div><div class="skel"></div><div class="skel" style="width:86%"></div><div class="skel" style="width:64%"></div></div>`;
    };
    draw();
    const tick = setInterval(() => {
      k++;
      if (k >= rows.length) { clearInterval(tick); render(3); return; }
      draw();
    }, 900);
  }

  frame.addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-goto], .clause.risk");
    if (!t) return;
    if (t.dataset.cite) return render(4, { cite: t.dataset.cite });
    if (t.dataset.prio) {
      const row = t.closest(".prow");
      const was = row.classList.contains("open");
      $$(".prow", frame).forEach((r) => { r.classList.remove("open"); $(".phead", r).setAttribute("aria-expanded", "false"); });
      if (!was) { row.classList.add("open"); t.setAttribute("aria-expanded", "true"); }
      scrollClause(t.dataset.prio);
      return placePins(SCREENS[current - 1].notes.items);
    }
    if (t.dataset.goto) return scrollClause(t.dataset.goto);
    if (t.classList.contains("clause")) return scrollClause(t.dataset.clause);
    if (t.hasAttribute("data-close")) return render(3);
    if (t.hasAttribute("data-start")) return runProgress();
    if (t.hasAttribute("data-side")) { toast("已确认立场，下面展示 AGRI-R4 的审查结果"); return setTimeout(() => render(3), 900); }
    if (t.dataset.go) return render(+t.dataset.go);
    if (t.hasAttribute("data-copy")) return toast("已复制修改建议");
    if (t.closest(".fb")) {
      const fb = t.closest(".fb");
      $$("button", fb).forEach((b) => b.setAttribute("aria-pressed", String(b === t)));
      let ok = $(".ok", fb);
      if (!ok) { ok = document.createElement("span"); ok.className = "ok"; fb.appendChild(ok); }
      ok.innerHTML = `${icon("check")}已记录`;
      return;
    }
    if (t.classList.contains("send") && current === 3) return render(5);
  });

  const steps = $("#steps");
  SCREENS.forEach((s, i) => {
    const b = document.createElement("button");
    b.dataset.s = i + 1;
    b.innerHTML = `<b>${i + 1}</b>${s.name}`;
    b.onclick = () => render(i + 1);
    steps.appendChild(b);
  });
  const nt = $("#notes-toggle");
  if (nt) nt.onclick = () => setNotes(!document.body.classList.contains("show-notes"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") render(current + 1);
    if (e.key === "ArrowLeft") render(current - 1);
  });

  function fit() {
    if (exportMode) return;
    const board = $("#board");
    if (!board) return;
    const w = 1440 + (document.body.classList.contains("show-notes") ? 428 : 0);
    const stage = $(".stage");
    const s = Math.min((stage.clientWidth - 48) / w, (stage.clientHeight - 40) / 900, 1);
    board.style.transform = `translate(-50%, -50%) scale(${s})`;
  }
  window.addEventListener("resize", fit);

  render(+params.get("s") || 1, { cite: params.get("cite") || undefined });
  setNotes(params.get("notes") === "1" || (!exportMode && params.get("notes") !== "0"));
  document.fonts && document.fonts.ready.then(() => { placePins(SCREENS[current - 1].notes.items); document.body.dataset.ready = "1"; });
})();
