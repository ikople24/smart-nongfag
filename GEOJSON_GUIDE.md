# คู่มือการใช้งาน GeoJSON ในระบบ Smart SAARD

## ภาพรวม

ระบบได้เพิ่มความสามารถในการนำเข้าและแสดงข้อมูล GeoJSON เพื่อแสดงพื้นที่ชุมชนและพื้นที่ที่มีปัญหามากในแผนที่

## ข้อมูล GeoJSON ที่รองรับ

### โครงสร้างข้อมูล
```json
{
  "type": "FeatureCollection",
  "name": "ชื่อชุดข้อมูล",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "boundaryor": "ชื่อตำบล",
        "title": "ชื่อหมู่บ้าน"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[lng, lat], [lng, lat], ...]]
      }
    }
  ]
}
```

### ข้อมูลที่รองรับ
- **ตำบลสะอาด**: 14 หมู่บ้าน
  - หมู่1-สะอาด
  - หมู่2-หนองเรือ
  - หมู่3-นาศรี
  - หมู่4-โคกสว่าง
  - หมู่5-หนองอ้อ
  - หมู่6-โนนดงมัน
  - หมู่7-ค้อท่าโพธิ์
  - หมู่8-คำบง
  - หมู่9-คำบง
  - หมู่10-ดงเค็ง
  - หมู่11-คำบง
  - หมู่12-นาศรี
  - หมู่13-คำบง
  - หมู่14-โนนดงมัน

## การใช้งาน

### 1. การโหลดข้อมูล GeoJSON

#### โหลดจากไฟล์
```javascript
import { loadGeoJSONFromFile } from '@/utils/geojsonUtils';

const loadData = async () => {
  try {
    const data = await loadGeoJSONFromFile('/saard.geojson');
    console.log('GeoJSON loaded:', data);
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
  }
};
```

#### โหลดจาก URL
```javascript
import { loadGeoJSONFromURL } from '@/utils/geojsonUtils';

const loadData = async () => {
  try {
    const data = await loadGeoJSONFromURL('https://example.com/data.geojson');
    console.log('GeoJSON loaded:', data);
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
  }
};
```

### 2. การแปลงข้อมูล GeoJSON เป็น Polygon

#### แปลงข้อมูลพื้นฐาน
```javascript
import { convertGeoJSONToPolygons } from '@/utils/geojsonUtils';

const polygons = convertGeoJSONToPolygons(geojsonData);
```

#### สร้าง Polygon สำหรับชุมชน
```javascript
import { createCommunityPolygonsFromGeoJSON } from '@/utils/geojsonUtils';

const communityPolygons = createCommunityPolygonsFromGeoJSON(geojsonData, {
  fillOpacity: 0.15,
  weight: 2
});
```

#### สร้าง Polygon สำหรับพื้นที่ปัญหา
```javascript
import { createProblemAreaPolygonsFromGeoJSON } from '@/utils/geojsonUtils';

const problemPolygons = createProblemAreaPolygonsFromGeoJSON(geojsonData, complaints, {
  fillOpacity: 0.3
});
```

### 3. การใช้งานใน AdminDashboardMap

```javascript
// ใน pages/admin/dashboard.jsx
const [geojsonData, setGeojsonData] = useState(null);
const [polygons, setPolygons] = useState([]);

useEffect(() => {
  loadGeoJSONData();
}, []);

const loadGeoJSONData = async () => {
  try {
    const data = await loadGeoJSONFromFile('/saard.geojson');
    setGeojsonData(data);
    
    // สร้าง polygons
    const communityPolygons = createCommunityPolygonsFromGeoJSON(data);
    const problemPolygons = createProblemAreaPolygonsFromGeoJSON(data, complaints);
    
    setPolygons([...communityPolygons, ...problemPolygons]);
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
  }
};

// ส่งไปยังแผนที่
<MapWithNoSSR complaints={complaints} polygons={polygons} />
```

## ฟังก์ชัน Utility ที่มีให้

### 1. convertGeoJSONToPolygons(geojsonData)
แปลงข้อมูล GeoJSON เป็นรูปแบบ polygon ที่ระบบสามารถใช้งานได้

### 2. createCommunityPolygonsFromGeoJSON(geojsonData, options)
สร้าง polygon สำหรับแสดงพื้นที่ชุมชน

### 3. createProblemAreaPolygonsFromGeoJSON(geojsonData, complaints, options)
สร้าง polygon สำหรับแสดงพื้นที่ที่มีปัญหามาก

### 4. loadGeoJSONFromFile(filePath)
โหลดข้อมูล GeoJSON จากไฟล์

### 5. loadGeoJSONFromURL(url)
โหลดข้อมูล GeoJSON จาก URL

### 6. findPolygonContainingPoint(point, polygons)
ตรวจสอบว่าจุดอยู่ในพื้นที่ GeoJSON หรือไม่

### 7. calculatePolygonAreaFromGeoJSON(coordinates)
คำนวณพื้นที่ของ polygon จาก GeoJSON

## การปรับแต่ง

### การเปลี่ยนสี
```javascript
const customPolygons = createCommunityPolygonsFromGeoJSON(geojsonData, {
  fillOpacity: 0.2,
  weight: 2,
  customPopupContent: (polygon) => `
    <div class="text-sm">
      <p><strong>ชื่อหมู่บ้าน:</strong> ${polygon.name}</p>
      <p><strong>ตำบล:</strong> ${polygon.boundaryor}</p>
      <p><strong>ข้อมูลเพิ่มเติม:</strong> เนื้อหาที่ต้องการ</p>
    </div>
  `
});
```

### การเพิ่ม Event Handler
```javascript
const polygonsWithEvents = polygons.map(polygon => ({
  ...polygon,
  onClick: (polygon) => {
    console.log('คลิกที่ polygon:', polygon.name);
    // เปิด modal แสดงรายละเอียด
    // หรือ navigate ไปหน้าอื่น
  }
}));
```

## การแสดงผลในแผนที่

### Legend
- แสดงรายชื่อหมู่บ้านทั้งหมด
- แสดงสีของแต่ละพื้นที่
- ปุ่มเปิด/ปิดการแสดง polygon

### Popup
- แสดงชื่อหมู่บ้าน
- แสดงชื่อตำบล
- แสดงจำนวนพิกัด
- แสดงจำนวนปัญหา (ถ้ามี)

### การควบคุม
- คลิกที่ polygon เพื่อดูรายละเอียด
- ปุ่มซ่อน/แสดง polygon
- การปรับ zoom และ pan

## การแก้ไขปัญหา

### GeoJSON ไม่โหลด
- ตรวจสอบเส้นทางไฟล์
- ตรวจสอบรูปแบบข้อมูล GeoJSON
- ตรวจสอบ console สำหรับ error

### Polygon ไม่แสดง
- ตรวจสอบว่าข้อมูล coordinates ถูกต้อง
- ตรวจสอบการแปลงพิกัด [lng, lat] เป็น [lat, lng]
- ตรวจสอบว่า showPolygons เป็น true

### Performance ช้า
- ลดจำนวน polygon
- ลดความซับซ้อนของ coordinates
- ใช้ lazy loading

## หมายเหตุสำคัญ

1. **พิกัด**: GeoJSON ใช้รูปแบบ [longitude, latitude] แต่ Leaflet ใช้ [latitude, longitude]
2. **การแปลง**: ระบบจะแปลงพิกัดอัตโนมัติ
3. **สี**: ระบบจะสร้างสีอัตโนมัติตามชื่อหมู่บ้าน
4. **Performance**: หลีกเลี่ยงการสร้าง polygon จำนวนมากเกินไป
5. **Responsive**: Polygon จะปรับขนาดตามการ zoom ของแผนที่

## ตัวอย่างไฟล์ GeoJSON

ไฟล์ `public/saard.geojson` มีข้อมูลพื้นที่ชุมชนของตำบลสะอาด 14 หมู่บ้าน ซึ่งสามารถใช้เป็นตัวอย่างสำหรับการสร้างไฟล์ GeoJSON ใหม่
