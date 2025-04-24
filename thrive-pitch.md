## 🧠 One-Line Summary
**Thrive** is an agentic AI-powered task manager that turns wellbeing, life goals, and financial intentions into personalised, adaptive micro-tasks — helping users move forward at their own pace with compassion and clarity.

## 📖 Real-World Example: Ahmed's Journey

Meet Ahmed, a 26-year-old ICU nurse in Manchester working rotating night shifts. Like many young adults, Ahmed faces unique challenges in maintaining his wellbeing:

- Erratic schedule due to rotating night shifts
- Difficulty maintaining consistent routines
- Privacy concerns about health data usage
- Need for personalized support that fits his lifestyle

Most young adults feel overwhelmed trying to juggle mental health, life admin, and finances — with multiple apps, zero cohesion, and no clear path forward.

**Thrive** changes that.  
It's not just a to-do list — it's a compassionate, intelligent guide.  
Using agentic AI, Thrive learns how you're feeling, what you're facing, and where you want to go — then crafts a personalised plan, broken down into manageable tasks.  

By integrating wellness tools, financial advice, and life coaching into a unified task system, Thrive helps Ahmed improve wellbeing *while* staying on top of life

### How Thrive Helped Ahmed

**Personalized Task Management**
- Thrive created a schedule that adapts to Ahmed's rotating shifts
- Suggested optimal nap times based on his upcoming shifts
- Created pre-shift routines to help him prepare mentally and physically
- Recommended post-shift wind-down activities to improve sleep quality

**Smart Recommendations**
- Light exposure suggestions during his waking hours
- Micro-breaks designed for hospital environments
- Quick mindfulness exercises that can be done in a break room
- Nutrition tips for shift workers
- Social connection prompts that work with his schedule

**Privacy-First Approach**
Understanding Ahmed's concerns about data privacy, Thrive:
- Operated on a privacy-first basis
- Gave Ahmed complete control over his data
- Used local processing where possible
- Provided clear explanations of how data was used

**Results**
- Increased rest-day sleep to at least 5 hours
- Reduced on-shift errors through better cognitive function
- Maintained better work-life balance despite irregular hours
- Felt more in control of his wellbeing

Ahmed's story demonstrates how Thrive adapts to any young adult's unique circumstances, providing personalized support that evolves with their needs and lifestyle.

---

## ✅ Strengths of the Solution

- **Human-centered agentic AI**: Inspired by how real guides support people — with perception, empathy, adaptability, and pacing.
- **Unified experience**: Connects wellness, finances, and daily life admin into one intelligent interface.
- **Emotionally intelligent**: Responds to mood, stress, and recent history to modulate the type, tone, and intensity of tasks.
- **Truly personalised**: Understands not just goals, but also energy levels, habits, and personal values.
- **Scalable tech foundation**: Powered by Azure infrastructure, real-time data streams, and LLM-driven planning logic.

---

## ✅ Azure Resources in Your Diagram + FinwiseOS Usage

| Azure Resource | Role in FinwiseOS |
|----------------|-------------------|
| Application Gateway + WAF | Entry point for all traffic (frontend + API); applies Web Application Firewall rules |
| App Service (Next.js frontend) | Hosts the FinwiseOS user interface (React/Next.js), deployed behind the gateway |
| App Service (Agent & App APIs) | Hosts backend APIs including agent orchestrator and smaller AI agents (FastAPI) |
| App Service integration subnet | Isolates app services in a private subnet to restrict public access |
| Azure Cosmos DB | Used to store structured data like user_state, quests, xp_logs, trust_flags |
| Azure Redis Cache | Speeds up access to session tokens, user memory fragments, and LLM prompt chains |
| Azure Key Vault | Securely stores API keys, LLM credentials, health sync tokens, OAuth secrets |
| Azure Machine Learning | Optional: Hosts custom models (e.g., for embeddings or agent-level inference) |
| Managed Online Endpoint (ML) | Endpoint for inferencing hosted ML models (e.g., prompt tuning or emotion scoring) |
| Compute Instances (private subnet) | Hosts Qdrant (vector memory), or open-source LLMs like llama.cpp if self-hosted |
| Azure Storage | Stores logs, backups, session exports, and user-submitted attachments |
| Azure AI Search | Optional: Used for RAG (retrieval-augmented generation) if browsing financial content |
| Azure OpenAI Service | Handles core LLM prompts for goal parsing, tone writing, adaptive dialog |
| Azure Container Registry | Stores containerized agent images deployed via App Service or AKS |
| Log Analytics Workspace | Tracks metrics, agent errors, trust-related events, and system health logs |
| Diagnostics Settings | Sends logs from WAF, App Service, ML, and Key Vault to central monitoring |
| Managed Identity | Grants App Services and ML resources access to Key Vault without exposing credentials |
| Private Endpoints | Secure connection to Cosmos DB, Redis, Key Vault, Storage, etc. without public IPs |
| Subnets + NSGs | Segregate services into logical units (e.g. frontend, backend, data) and apply firewall rules |
| Jump Boxes / Build Agents | For secure SSH/RDP access to VMs or for CI/CD deployments (e.g., GitHub runners) |
| Hub Virtual Network | Central VNET enabling communication between workloads via peering |
| User Defined Routes (UDR) | Routes traffic from spoke to hub securely, ensuring all egress flows through firewalls |
| Spoke Virtual Network | Workload-specific subnet for FinwiseOS, peered to hub |
| Azure Firewall / DDoS Protection | Protects backend systems from unauthorized access and mitigates large-scale attacks |
| Azure Bastion | Secure remote access to private subnets (e.g. to admin Qdrant or containers) |
| Cost Management / Policy Assignments | Manages resource quotas, budget alerts, and compliance rules |
| Defender for Cloud | Monitors security posture, alerts on misconfigurations or threat signals |
| Role Assignments | Controls access to APIs, storage, and sensitive agent operations via RBAC |

---


## 🔜 Future Improvements & Accessibility

As we continue developing Thrive, we're committed to making it accessible and inclusive for all users. Our upcoming improvements include:

### Accessibility Enhancements
- **Visual Accessibility**
  - High contrast color schemes
  - Adjustable text sizes
  - Screen reader optimization
  - Color-blind friendly palettes
  - Reduced motion options

- **Cognitive Accessibility**
  - Simplified language options
  - Clear, concise task descriptions
  - Step-by-step guidance
  - Visual task breakdowns
  - Reduced cognitive load in UI design

- **Motor Accessibility**
  - Keyboard navigation support
  - Voice command integration
  - Customizable gesture controls
  - Reduced need for precise movements

### Development Roadmap
Our development stages outline the comprehensive plan for Thrive's growth:

1. **MVP Phase** (Current)
   - Core task management
   - Basic personalization
   - Essential wellbeing features

2. **Resource Hub Integration**
   - Expanded wellbeing resources
   - Community features
   - Enhanced personalization

3. **Health Data Integration**
   - Smart device connectivity
   - Health pattern recognition
   - Advanced analytics

4. **Community & Social Features**
   - Peer support networks
   - Group challenges
   - Shared experiences

For detailed information about our development stages and upcoming features, please refer to our [Development Stages Document](development-stages.md).

### Continuous Improvement
We're committed to:
- Regular user feedback collection
- Accessibility audits
- Inclusive design practices
- Ongoing feature refinement
- Community-driven development

Join us in building a more accessible and inclusive digital wellbeing platform. Your feedback and needs help shape Thrive's future.


