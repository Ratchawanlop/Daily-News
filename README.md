<h1 align="center">📰 AI Business News Assistant (RAG-Powered LINE Bot)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/n8n-Workflow_Automation-FF6600?style=for-the-badge&logo=n8n&logoColor=white" />
  <img src="https://img.shields.io/badge/LINE_API-Flex_Messages-00C300?style=for-the-badge&logo=LINE&logoColor=white" />
  <img src="https://img.shields.io/badge/Ollama-Local_LLM-black?style=for-the-badge&logo=ollama&logoColor=white" />
  <img src="https://img.shields.io/badge/Pinecone-Vector_Database-000000?style=for-the-badge&logo=pinecone&logoColor=white" />
</p>

โปรเจกต์ผู้ช่วยนักวิเคราะห์ข่าวเศรษฐกิจส่วนตัวบนแอปพลิเคชัน LINE ที่ทำงานแบบอัตโนมัติเต็มรูปแบบ (Full Automation) พัฒนาด้วย **n8n** โดยมีการใช้สถาปัตยกรรม **RAG (Retrieval-Augmented Generation)** เพื่อให้ AI สามารถจดจำข้อมูลข่าวสารรายวัน และตอบคำถามผู้ใช้งานได้อย่างแม่นยำ พร้อมการแสดงผลผ่าน Flex Message ที่สวยงามและเป็นมืออาชีพ

---

## ✨ Features (คุณสมบัติเด่น)

- ⏰ **Automated Daily Digest (Push):** ดึงข่าวเศรษฐกิจจาก NewsAPI แบบอัตโนมัติตามเวลาที่กำหนด (07:00, 12:00, 18:00 น.) สรุปใจความสำคัญด้วย AI และส่งเป็นรายงานรูปแบบ Carousel Flex Message สุดพรีเมียม
- 🧠 **RAG-Powered Chat (Reply):** ระบบแชทบอทที่ดึงความรู้จากข่าวในฐานข้อมูล (Pinecone Vector DB) มาวิเคราะห์และตอบคำถามผู้ใช้งานแบบเรียลไทม์
- 🛡️ **Anti-Hallucination Guard:** มีระบบ Prompt Engineering ป้องกันไม่ให้ AI แต่งข้อมูลหรือมโนคำตอบเอง หากไม่มีข่าวที่เกี่ยวข้องในวันนั้น
- 🔀 **Smart Routing:** มีระบบแยกลอจิกการตอบคำถาม (Branching) เช่น หากผู้ใช้กดเมนู "วิธีใช้งาน" บอทจะส่งคู่มือให้ทันทีโดยไม่เปลืองทรัพยากร AI ประมวลผล
- 🎨 **Premium UI/UX:** ออกแบบการแสดงผลด้วย LINE Flex Message (Mega Size) สีทอง-กรมท่า สไตล์ Business News ให้อ่านง่าย สบายตาบนมือถือ

---

## 🏗️ System Architecture (สถาปัตยกรรมระบบ)

โปรเจกต์นี้แบ่งออกเป็น 2 Workflows หลัก ซึ่งสามารถนำไฟล์ `.json` ไป Import ใน n8n ได้ทันที:

### 1. Daily News Digest Bot (`Daily News Digest Bot.json`)
ทำหน้าที่เป็น **Data Pipeline & Content Generator**
- **Schedule Trigger:** รันอัตโนมัติ 3 เวลาต่อวัน
- **Data Fetching:** ดึงข้อมูลจาก NewsAPI (US Business)
- **AI Processing:** ใช้ `gpt-oss:20b` สรุปเนื้อหาข่าวเป็นภาษาไทยแบบกระชับ
- **Vector Storage:** แปลงข้อความด้วย HuggingFace Embeddings (`all-MiniLM-L6-v2`) และบันทึกลง **Pinecone** เพื่อเป็นฐานความจำให้บอท
- **Broadcasting:** รัน JavaScript เพื่อประกอบร่างข้อมูลเป็น Flex Message (Carousel) และส่ง Push Message เข้ากลุ่มหรือแชทส่วนตัว

### 2. Daily Chat Bot (`Daily Chat Bot.json`)
ทำหน้าที่เป็น **Interactive Q&A Agent**
- **Webhook Listener:** รอรับข้อความจากผู้ใช้ผ่าน LINE Official Account
- **Intent Routing:** โหนด `If` ตรวจสอบคำสั่ง หากเป็นคำว่า "วิธีใช้งานบอทนี้" จะตอบกลับด้วย Flex Message คู่มือทันที
- **RAG QA Chain:** นำคำถามไปค้นหาบริบทที่เกี่ยวข้องใน Pinecone และส่งให้ Ollama (`gpt-oss:20b`) สังเคราะห์คำตอบ
- **Response:** จัดรูปแบบข้อความให้อ่านง่ายและส่งกลับเป็น Flex Message (Reply)

---

## 🛠️ Tech Stack

- **Automation Engine:** n8n (Self-Hosted)
- **Messaging Interface:** LINE Messaging API (Reply & Push)
- **Large Language Model (LLM):** Ollama (`gpt-oss:20b`)
- **Vector Database:** Pinecone
- **Embeddings:** Hugging Face Inference API (`sentence-transformers/all-MiniLM-L6-v2`)
- **Data Source:** NewsAPI

---

## 🚀 Installation & Setup (การติดตั้ง)

1. **Clone/Download Repository:** ดาวน์โหลดไฟล์ `Daily News Digest Bot.json` และ `Daily Chat Bot.json`
2. **Import to n8n:** เปิดโปรแกรม n8n ของคุณ นำไฟล์ทั้ง 2 ไป Import เป็น Workflow ใหม่
3. **Setup Credentials:** สร้างและเชื่อมต่อ Credentials ใน n8n สำหรับเครื่องมือต่อไปนี้:
   - `LINE Messaging API` (Channel Access Token)
   - `NewsAPI` (API Key)
   - `Pinecone` (API Key & Index Name)
   - `Hugging Face` (Access Token)
   - `Ollama` (Server URL)
4. **LINE Webhook & Rich Menu:**
   - นำ Webhook URL จาก Workflow ที่ 2 ไปตั้งค่าใน LINE Developers
   - สร้างริชเมนู (Rich Menu) เพื่อให้ผู้ใช้กดเรียกคำสั่งต่างๆ ได้ง่ายขึ้น (เช่น "ดูข่าวเด่นวันนี้", "วิธีใช้งาน")
5. **Activate Workflows:** เปิดสวิตช์ Active ที่มุมขวาบนของ n8n เพื่อให้ระบบเริ่มทำงานแบบอัตโนมัติ

---

## 👨‍💻 Developer

- **ศุภชัย สังข์ศิรินทร์ (Supachai Sungsirin)**
- **ณัฐภัทร วิศิษฏ์เจริญ (Nattapat Wisitcharoen)**
- **วรากร มาตุเรศ (Varakorn Matures)**
- **ราชวัลลภ เนาว์เพชร์ (Ratchawanlop Naopech)**
