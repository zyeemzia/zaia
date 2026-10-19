window.TRACK = window.TRACK || { modules: [], exam: [] };
TRACK.meta = {
  "code": "ZAIA",
  "brand": "ZyeemZia™",
  "name": "Artificial Intelligence Architecture",
  "full": "ZyeemZia™ Artificial Intelligence Architecture",
  "short": "ZAIA",
  "domain": "zaia.zyeemzia.com",
  "pdf": "ZAIA-Book.pdf",
  "storeKey": "zaia.v1",
  "tagline": "Design AI systems that work in production.",
  "lead": "A modern, hands-on certification track for engineers and architects: data, models, LLM applications, retrieval, agents, operations and trustworthy AI, organised into one layered architecture you can reuse on every project.",
  "signature": { "type": "stack", "name": "The ZAIA Stack", "caption": "Eight layers of every production AI system, from foundations at the bottom to trust wrapped around everything. Each module builds one layer." },
  "hours": "45–55",
  "level": "Professional → Architect",
  "audience": ["Software and data engineers", "Solution and enterprise architects", "ML engineers moving to generative AI", "Technical product managers and CTOs"],
  "passMark": 80,
  "distinctionMark": 90,
  "examSize": 40,
  "examMinutes": 60,
  "capstone": {
    "title": "Capstone: Architect a production AI system",
    "brief": "Choose a real use case from your organisation, or a realistic one (for example: a Bangla-and-English customer support assistant for a mobile operator, a document question-answering portal for a ministry, or a fraud-detection service for a payments app). Design it end to end across the ZAIA Stack and produce an architecture pack that an engineering team could build and a risk committee could approve.",
    "deliverables": [
      "AI use-case canvas: problem, users, success metrics, constraints and why AI",
      "At least three architecture decision records (ADRs) with options and trade-offs",
      "Data architecture: sources, pipelines, data contracts, privacy controls",
      "Model strategy: prompting vs retrieval vs fine-tuning decision with evidence",
      "Reference architecture diagram across all eight ZAIA Stack layers",
      "Retrieval and/or agent design: chunking, retrieval, tools, memory, approval gates",
      "Evaluation plan: offline golden set, online metrics, release criteria",
      "Operations plan: deployment strategy, observability, reliability and fallbacks",
      "Cost model with unit economics and cost guardrails",
      "Threat model, responsible-AI checklist and governance plan"
    ],
    "rubric": [
      { "criterion": "Problem framing & metrics", "levels": ["AI used without a clear problem", "Problem and metrics defined", "Business, model and system metrics linked with targets"] },
      { "criterion": "Decisions & trade-offs", "levels": ["Choices not explained", "ADRs with reasons", "ADRs compare options against quality attributes"] },
      { "criterion": "Data architecture", "levels": ["Data sources only", "Pipelines and quality checks", "Contracts, lineage and privacy by design"] },
      { "criterion": "Model & retrieval design", "levels": ["Single model, no rationale", "Justified model and retrieval choices", "Evidence-based, with routing and fallbacks"] },
      { "criterion": "Agents & integration", "levels": ["Not considered", "Tools defined", "Least-privilege tools, gates and failure containment"] },
      { "criterion": "Evaluation & operations", "levels": ["No evaluation", "Offline evaluation and monitoring", "Evals in CI, staged rollout and full observability"] },
      { "criterion": "Cost & performance", "levels": ["No cost estimate", "Cost estimate", "Unit economics, latency budget and guardrails"] },
      { "criterion": "Security, governance & ethics", "levels": ["Not addressed", "Basic controls", "Threat model, layered defences and governance operating model"] }
    ]
  },
  "certificate": {
    "title": "Certificate of Achievement",
    "statement": "has successfully completed all modules of the ZyeemZia™ Artificial Intelligence Architecture track and passed the ZAIA certification exam",
    "skills": ["AI solution architecture", "Data & model strategy", "RAG & agentic systems", "LLMOps & cost engineering", "AI security & governance"]
  },
  "disclaimer": "ZAIA is an independent certification programme created and issued by ZyeemZia. It is not affiliated with, endorsed by, or a substitute for any cloud provider, AI company, Google, Coursera or standards body certification. All product and standard names belong to their respective owners.",
  "studyPlan": [
    ["Week 1", "m1 Foundations", "Frame your capstone use case, write ADR 1"],
    ["Week 2", "m2 Data", "Data map, data contract, privacy controls"],
    ["Week 3", "m3 Models", "Model strategy and evaluation metrics"],
    ["Week 4", "m4 LLM Apps", "Prompt spec, structured output, token budget"],
    ["Week 5", "m5 Retrieval", "RAG design and chunking experiment"],
    ["Week 6", "m6 Agents", "Tool specs, approval gates, agent risks"],
    ["Week 7", "m7 Operations", "Eval suite, rollout plan, cost model"],
    ["Week 8", "m8 Trust", "Threat model, governance, practice and certification exam"]
  ]
};
