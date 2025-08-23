# การลบ Address Field ออกจากฟอร์ม

## การเปลี่ยนแปลงที่ทำ

### 1. ลบ Address Field จาก ReporterInput Component
- **ไฟล์:** `components/ReporterInput.js`
- **การเปลี่ยนแปลง:**
  - ลบ `address` field ออกจาก validation schema
  - ลบ `address` และ `setAddress` props
  - ลบส่วน UI ที่แสดง address input field
  - ปรับหมายเลขลำดับของเบอร์โทรศัพท์จาก 7 เป็น 6

### 2. ลบ Address State จาก ComplaintFormModal
- **ไฟล์:** `components/ComplaintFormModal.js`
- **การเปลี่ยนแปลง:**
  - ลบ `address` state
  - ลบ `address` จาก payload ที่ส่งไปยัง backend
  - ลบ `setAddress('')` จาก handleClearForm function
  - ลบ `address` และ `setAddress` props ที่ส่งไปยัง ReporterInput

### 3. ลบ Address Field จาก Database Schema
- **ไฟล์:** `models/SubmittedReport.js`
- **การเปลี่ยนแปลง:**
  - ลบ `address: String` field ออกจาก SubmittedReportSchema

### 4. ลบ Address Display จาก ComplaintDetailModal
- **ไฟล์:** `components/ComplaintDetailModal.js`
- **การเปลี่ยนแปลง:**
  - ลบส่วนที่แสดงที่อยู่ในข้อมูลผู้แจ้ง

## ผลลัพธ์

### ✅ **ฟอร์มที่ปรับปรุงแล้ว:**
1. **ชุมชน** (Community)
2. **เลือกรายการปัญหา** (Select problem items)
3. **แนบรูปภาพ** (Attach images)
4. **รายละเอียดของปัญหา** (Problem details)
5. **ข้อมูลผู้แจ้ง** (Reporter information)
6. **เบอร์โทรศัพท์** (Phone number)
7. **ตำแหน่ง** (Location)

### 🗑️ **ส่วนที่ถูกลบ:**
- ❌ ส่วน "ที่อยู่" (Address) - หมายเลข 6 เดิม

### 📱 **การแสดงผล:**
- ฟอร์มจะสั้นลงและใช้งานง่ายขึ้น
- ลดความซับซ้อนในการกรอกข้อมูล
- เน้นข้อมูลที่จำเป็นมากขึ้น

## การทดสอบ

1. เปิดฟอร์มแจ้งปัญหา
2. ตรวจสอบว่าไม่มีส่วน "ที่อยู่" ในฟอร์ม
3. ตรวจสอบว่าสามารถส่งฟอร์มได้โดยไม่มี address
4. ตรวจสอบว่าในหน้าแสดงรายละเอียดไม่มีการแสดงที่อยู่

## หมายเหตุ

- การลบ address field จะไม่ส่งผลกระทบต่อข้อมูลเก่าที่มี address อยู่แล้ว
- ข้อมูล address เก่าจะยังคงอยู่ในฐานข้อมูล แต่จะไม่ถูกแสดงใน UI
- หากต้องการลบข้อมูล address เก่าออกจากฐานข้อมูล จะต้องทำการ migration แยกต่างหาก
