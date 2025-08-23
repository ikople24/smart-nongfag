# การแก้ไขปัญหาการแก้ไข Icons URL ในหน้า Admin

## ปัญหาที่พบ
1. **ข้อมูลเดิมไม่ถูกโหลดเข้ามาในฟอร์ม** - เมื่อกดปุ่ม "แก้ไข" ข้อมูลเดิม (label, icon URL, category) ไม่ถูกโหลดเข้ามาในฟอร์ม
2. **สร้างรายการใหม่แทนการอัปเดต** - เมื่อกดบันทึกจะสร้างรายการใหม่แทนที่จะอัปเดตข้อมูลเดิม
3. **ข้อมูลเก่าค้างในฟอร์ม** - เมื่อเปลี่ยน tab ข้อมูลเก่าจะค้างอยู่ในฟอร์ม

## การแก้ไขที่ทำ

### 1. เพิ่ม State สำหรับการแก้ไข
```javascript
const [editingId, setEditingId] = useState(null); // เก็บ ID ของรายการที่กำลังแก้ไข
```

### 2. ปรับปรุง handleEdit Function
```javascript
const handleEdit = (item) => {
  setLabel(item.label);
  // สำหรับ admin options ใช้ icon_url, สำหรับ problem options ใช้ iconUrl
  setIconUrl(isAdminTab ? item.icon_url : item.iconUrl);
  // สำหรับ admin options ใช้ menu_category, สำหรับ problem options ใช้ category
  setCategory(isAdminTab ? item.menu_category : item.category);
  setIsEditing(true);
  setEditingId(item._id); // เก็บ ID ของรายการที่กำลังแก้ไข
};
```

### 3. ปรับปรุง handleSubmit Function
```javascript
const method = isEditing ? "PUT" : "POST"; // ใช้ PUT เมื่อแก้ไข, POST เมื่อสร้างใหม่
const url = isEditing ? `${endpoint}/${editingId}` : endpoint;
```

### 4. เพิ่ม resetForm Function
```javascript
const resetForm = () => {
  setLabel("");
  setIconUrl("");
  setCategory("");
  setIsEditing(false);
  setEditingId(null);
};
```

### 5. เพิ่ม handleTabChange Function
```javascript
const handleTabChange = (tab) => {
  setActiveTab(tab);
  resetForm(); // reset form เมื่อเปลี่ยน tab
};
```

### 6. สร้าง API Endpoints ใหม่
- `pages/api/admin-options/[id].js` - สำหรับจัดการ admin options ตาม ID
- `pages/api/problem-options/[id].js` - สำหรับจัดการ problem options ตาม ID

## การเปลี่ยนแปลงใน UI
1. **หัวข้อฟอร์มเปลี่ยนตามสถานะ** - แสดง "แก้ไข..." เมื่อกำลังแก้ไข
2. **ปุ่มบันทึกเปลี่ยนข้อความ** - แสดง "อัปเดตข้อมูล" เมื่อแก้ไข
3. **ข้อความแจ้งเตือนเปลี่ยน** - แสดง "อัปเดตข้อมูลสำเร็จ" เมื่อแก้ไข

## การทดสอบ
1. กดปุ่ม "แก้ไข" ในตาราง
2. ตรวจสอบว่าข้อมูลเดิมถูกโหลดเข้ามาในฟอร์ม
3. แก้ไขข้อมูล
4. กดปุ่ม "อัปเดตข้อมูล"
5. ตรวจสอบว่าข้อมูลถูกอัปเดตในตาราง
6. ตรวจสอบว่าไม่มีการสร้างรายการใหม่

## ผลลัพธ์
- ✅ ข้อมูลเดิมถูกโหลดเข้ามาในฟอร์มเมื่อกดแก้ไข
- ✅ การบันทึกจะอัปเดตข้อมูลเดิมแทนการสร้างใหม่
- ✅ ฟอร์มถูก reset เมื่อเปลี่ยน tab
- ✅ UI แสดงสถานะการแก้ไขอย่างชัดเจน
