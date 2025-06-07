# Snake Game - Project Plan & Guidelines

## 📋 ขอบเขตของโปรเจค (Project Scope)

### เป้าหมายหลัก
สร้างเกมงูแบบคลาสสิกที่เล่นบนเว็บเบราว์เซอร์ โดยใช้ JavaScript และ HTML5 Canvas

### ข้อมูลโปรเจค
- **ประเภท:** เกมงูแบบ Single Player
- **แพลตฟอร์ม:** Web Browser (HTML5 Canvas)
- **ภาษา:** JavaScript, HTML5, CSS3
- **เป้าหมาย:** สร้างเกมที่เล่นง่าย สนุก และทำงานได้บนทุกอุปกรณ์ที่มีเบราว์เซอร์

---

## 🎮 ฟีเจอร์ที่กำหนด (Features)

### Core Features (ฟีเจอร์หลัก)
- [x] งูเคลื่อนที่อย่างต่อเนื่อง
- [x] ควบคุมทิศทางด้วยปุ่มลูกศร (Arrow Keys)
- [x] กินอาหารเพื่อเพิ่มความยาวและคะแนน
- [x] ตรวจจับการชน (ชนตัวเอง/ชนขอบ)
- [x] ระบบคะแนน

### UI Features (ฟีเจอร์ UI)
- [ ] แสดงคะแนนปัจจุบัน
- [ ] หน้าจอ Game Over
- [ ] หน้าจอเริ่มเกม (Start Screen)
- [ ] ปุ่ม Restart
- [ ] ปุ่ม Pause/Play Toggle ระหว่างเกม

### Enhanced Features (ฟีเจอร์เพิ่มเติม)
- [ ] เพิ่มความเร็วตามคะแนน
- [ ] บันทึกคะแนนสูงสุด (Local Storage)
- [ ] เสียงประกอบ
- [ ] เอฟเฟกต์พิเศษ
- [ ] ระดับความยาก

---

## 🎨 การออกแบบ UI (UI Design)

### Color Palette
```css
Background: #000000 (Black)
Snake Body: #00FF00 (Lime Green)
Snake Head: #32CD32 (Lime Green - Darker)
Food: #FF0000 (Red)
Text: #FFFFFF (White)
UI Elements: #333333 (Dark Gray)
```

### Typography
- **Font Family:** 'Courier New', monospace (เพื่อให้ดูเป็น retro/pixel style)
- **Font Sizes:**
  - Score: 20px
  - Game Over: 32px
  - Instructions: 16px

### Layout Structure
```
┌─────────────────────────────┐
│ Score: 0        High: 100   │
├─────────────────────────────┤
│                             │
│        Game Canvas          │
│         400x400             │
│                             │
├─────────────────────────────┤
│   Use Arrow Keys to Play    │
└─────────────────────────────┘
```

---

## 📁 โครงสร้างไฟล์ (File Structure)

```
snake-game/
├── index.html          # หน้าหลัก
├── css/
│   └── style.css       # Styles
├── js/
│   ├── game.js         # Game logic หลัก
│   ├── snake.js        # Snake class
│   ├── food.js         # Food class
│   └── ui.js           # UI management
├── assets/
│   ├── sounds/         # เสียงประกอบ
│   └── images/         # รูปภาพ (ถ้ามี)
├── README.md           # คู่มือการใช้งาน
└── PROJECT_PLAN.md     # ไฟล์นี้
```

---

## 🎯 Game Mechanics

### การเคลื่อนที่
- งูเคลื่อนที่อย่างต่อเนื่องด้วยความเร็วคงที่
- ผู้เล่นสามารถเปลี่ยนทิศทางได้ (ห้ามกลับหลัง)
- Grid-based movement (20x20 pixels)

### การให้คะแนน
- กินอาหาร 1 ชิ้น = +10 คะแนน
- ความเร็วเพิ่มขึ้นทุกๆ 50 คะแนน (Optional)

### เงื่อนไขการจบเกม
1. งูชนขอบของ Canvas
2. งูชนตัวเอง

### การสุ่มอาหาร
- สุ่มตำแหน่งใหม่ทุกครั้งที่งูกิน
- ห้ามอาหารปรากฏบนตัวงู

---

## 🔧 Technical Specifications

### Canvas Settings
- **ขนาด:** 400x400 pixels
- **Grid Size:** 20x20 pixels
- **Frame Rate:** 10 FPS (100ms per frame)

### Controls

#### Desktop Controls
- **↑** Arrow Up: เคลื่อนที่ขึ้น
- **↓** Arrow Down: เคลื่อนที่ลง
- **←** Arrow Left: เคลื่อนที่ซ้าย
- **→** Arrow Right: เคลื่อนที่ขวา
- **Space:** หยุดชั่วคราว/เล่นต่อ (Pause/Play Toggle)
- **R:** เริ่มเกมใหม่ (Optional)

#### Mobile Controls (Primary Focus)
- **Virtual Arrow Buttons:** 4 ปุ่มทิศทางบนหน้าจอ
- **Touch/Tap:** ปุ่ม Start/Restart/Pause/Play
- **Pause/Play Toggle:** ปุ่มหยุดและเล่นต่อระหว่างเกม
- **Responsive Layout:** ปรับขนาดตามหน้าจอ
- **Touch-friendly:** ขนาดปุ่มเหมาะสมสำหรับนิ้ว (44px minimum)

---

## 📝 Development Roadmap

### Phase 1: Core Gameplay ✅
- [x] สร้างไฟล์ HTML, CSS, JS พื้นฐาน
- [x] เขียน game loop หลัก
- [x] สร้าง Snake class และ Food class
- [x] ระบบควบคุมและการเคลื่อนที่
- [x] การตรวจจับการชน

### Phase 2: UI Enhancement
- [ ] ปรับปรุง UI ให้สวยงาม
- [ ] เพิ่มระบบแสดงคะแนน
- [ ] สร้างหน้าจอ Game Over
- [ ] เพิ่มปุ่ม Start/Restart

### Phase 3: Advanced Features
- [ ] เสียงประกอบ
- [ ] Local Storage สำหรับ High Score
- [ ] เพิ่มความเร็วตามระดับ
- [ ] เอฟเฟกต์พิเศษ

### Phase 4: Polish & Deploy
- [ ] ทดสอบบนอุปกรณ์ต่างๆ
- [ ] ปรับปรุงประสิทธิภาพ
- [ ] เขียนเอกสาร README
- [ ] Deploy บน GitHub Pages

---

## 🚀 Deployment Plan

### Local Development
- ใช้ Live Server extension ใน VS Code
- ทดสอบบน Chrome, Firefox, Safari

### Production Deployment
- **Platform:** GitHub Pages
- **Domain:** `username.github.io/snake-game`
- **Features:**
  - Responsive design
  - Cross-browser compatibility
  - Mobile-friendly controls

---

## 📚 Learning Objectives

หลังจากทำโปรเจคนี้เสร็จ คุณจะได้เรียนรู้:
1. HTML5 Canvas API
2. JavaScript Game Development
3. Object-Oriented Programming in JS
4. Event Handling
5. Game Loop Concepts
6. Collision Detection
7. Local Storage API
8. Git Version Control
9. Web Deployment

---

## 🎮 Next Steps

1. **เริ่มต้น:** สร้างไฟล์ตามโครงสร้างที่กำหนด
2. **พัฒนา:** เขียนโค้ดตาม Roadmap
3. **ทดสอบ:** ทดสอบฟีเจอร์แต่ละส่วน
4. **Deploy:** อัปโหลดบน GitHub Pages
5. **ปรับปรุง:** เพิ่มฟีเจอร์ตามความต้องการ

---

*อัปเดตล่าสุด: 6 มิถุนายน 2025*
