# คู่มือการใช้งาน Polygon ในแผนที่ Admin Dashboard

## ภาพรวม

ระบบได้เพิ่มความสามารถในการแสดงรูปโพลิกอน (Polygon) ในแผนที่ของ Admin Dashboard เพื่อแสดงพื้นที่ชุมชนและพื้นที่ที่มีปัญหามาก

## คุณสมบัติที่เพิ่มเข้ามา

### 1. การแสดง Polygon
- แสดงพื้นที่ชุมชนด้วยรูปสี่เหลี่ยม
- แสดงพื้นที่ที่มีปัญหามากด้วยรูปวงกลม
- รองรับการคลิกเพื่อดูรายละเอียด
- มี popup แสดงข้อมูลเพิ่มเติม

### 2. การควบคุมการแสดงผล
- ปุ่มเปิด/ปิดการแสดง polygon
- Legend แสดงคำอธิบายสีและความหมาย
- การปรับความโปร่งใสของ polygon

## วิธีการใช้งาน

### การเพิ่ม Polygon ใหม่

#### 1. สร้าง Polygon แบบง่าย
```javascript
import { createCommunityPolygon, createRectanglePolygon } from '@/utils/polygonUtils';

const newPolygon = createCommunityPolygon(
  'ชื่อชุมชน',
  createRectanglePolygon(13.7563, 100.5018, 0.001, 0.001), // lat, lng, width, height
  {
    color: '#3b82f6',
    fillColor: '#3b82f6',
    fillOpacity: 0.2,
    popup: {
      title: 'ชื่อชุมชน',
      description: 'คำอธิบาย',
      content: 'เนื้อหาเพิ่มเติม'
    }
  }
);
```

#### 2. สร้าง Polygon รูปวงกลม
```javascript
import { createCirclePolygon } from '@/utils/polygonUtils';

const circleCoordinates = createCirclePolygon(13.7563, 100.5018, 100); // lat, lng, radius(m)
```

#### 3. สร้าง Polygon จากข้อมูลการร้องเรียน
```javascript
import { createProblemAreaPolygons } from '@/utils/polygonUtils';

const problemPolygons = createProblemAreaPolygons(complaints, 5); // threshold = 5
```

### การกำหนดค่าพื้นฐาน

#### โครงสร้างข้อมูล Polygon
```javascript
{
  id: 1,
  name: 'ชื่อพื้นที่',
  coordinates: [[lat, lng], [lat, lng], ...], // พิกัดของ polygon
  color: '#3b82f6',        // สีขอบ
  fillColor: '#3b82f6',    // สีพื้น
  fillOpacity: 0.2,        // ความโปร่งใส (0-1)
  weight: 2,               // ความหนาของเส้น
  popup: {
    title: 'หัวข้อ',
    description: 'คำอธิบาย',
    content: 'เนื้อหา HTML'
  },
  onClick: (polygon) => {
    // ฟังก์ชันเมื่อคลิก
  }
}
```

### การใช้งานใน AdminDashboardMap

#### 1. ส่งข้อมูล Polygon
```javascript
<MapWithNoSSR 
  complaints={filteredComplaints} 
  polygons={polygons} 
/>
```

#### 2. การควบคุมการแสดงผล
```javascript
const [showPolygons, setShowPolygons] = useState(true);

// ใน JSX
<button onClick={() => setShowPolygons(!showPolygons)}>
  {showPolygons ? 'ซ่อนพื้นที่' : 'แสดงพื้นที่'}
</button>
```

## ฟังก์ชัน Utility ที่มีให้

### 1. createCommunityPolygon(name, coordinates, options)
สร้างข้อมูล polygon สำหรับชุมชน

### 2. createRectanglePolygon(centerLat, centerLng, width, height)
สร้างพิกัดรูปสี่เหลี่ยมจากจุดศูนย์กลาง

### 3. createCirclePolygon(centerLat, centerLng, radius, segments)
สร้างพิกัดรูปวงกลมจากจุดศูนย์กลาง

### 4. createProblemAreaPolygons(complaints, threshold)
สร้าง polygon สำหรับพื้นที่ที่มีปัญหามาก

### 5. calculatePolygonArea(coordinates)
คำนวณพื้นที่ของ polygon

### 6. isPointInPolygon(point, polygon)
ตรวจสอบว่าจุดอยู่ใน polygon หรือไม่

## ตัวอย่างการใช้งานจริง

### การแสดงพื้นที่ชุมชน
```javascript
// ใน pages/admin/dashboard.jsx
const communityPolygons = [
  createCommunityPolygon(
    'ชุมชนสุขุมวิท',
    createRectanglePolygon(13.7563, 100.5018, 0.002, 0.002),
    {
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.2,
      popup: {
        title: 'ชุมชนสุขุมวิท',
        description: 'พื้นที่ชุมชนที่มีการแจ้งปัญหามากที่สุด',
        content: 'จำนวนปัญหา: 15 รายการ'
      }
    }
  )
];
```

### การแสดงพื้นที่ปัญหา
```javascript
// สร้าง polygon จากข้อมูลการร้องเรียน
const problemPolygons = createProblemAreaPolygons(complaints, 3);

// ส่งไปยังแผนที่
<MapWithNoSSR complaints={complaints} polygons={problemPolygons} />
```

## การปรับแต่งเพิ่มเติม

### การเปลี่ยนสีตามสถานะ
```javascript
const getPolygonColor = (status) => {
  switch (status) {
    case 'high': return '#ef4444'; // แดง
    case 'medium': return '#f59e0b'; // ส้ม
    case 'low': return '#3b82f6'; // น้ำเงิน
    default: return '#3b82f6';
  }
};
```

### การเพิ่ม Event Handler
```javascript
const handlePolygonClick = (polygon) => {
  console.log('คลิกที่ polygon:', polygon.name);
  // เปิด modal แสดงรายละเอียด
  // หรือ navigate ไปหน้าอื่น
};
```

## หมายเหตุสำคัญ

1. **พิกัด**: ต้องใช้รูปแบบ [latitude, longitude]
2. **สี**: ใช้ hex color code หรือชื่อสี CSS
3. **ความโปร่งใส**: ค่าตั้งแต่ 0 (โปร่งใส) ถึง 1 (ทึบ)
4. **Performance**: หลีกเลี่ยงการสร้าง polygon จำนวนมากเกินไป
5. **Responsive**: Polygon จะปรับขนาดตามการ zoom ของแผนที่

## การแก้ไขปัญหา

### Polygon ไม่แสดง
- ตรวจสอบว่าข้อมูล coordinates ถูกต้อง
- ตรวจสอบว่า showPolygons เป็น true
- ตรวจสอบ console สำหรับ error

### Polygon แสดงผิดตำแหน่ง
- ตรวจสอบลำดับพิกัด [lat, lng]
- ตรวจสอบการแปลงพิกัดจากระบบอื่น

### Performance ช้า
- ลดจำนวน polygon
- ลดความซับซ้อนของ coordinates
- ใช้ lazy loading สำหรับ polygon ขนาดใหญ่
