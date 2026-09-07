# توثيق الباك اند — Grovia

> **آخر تحديث:** سبتمبر 2026  
> **المسار:** `server/`  
> **قاعدة البيانات:** MongoDB (Atlas) عبر Mongoose

---

## جدول المحتويات

1. [نظرة عامة](#1-نظرة-عامة)
2. [التقنيات المستخدمة](#2-التقنيات-المستخدمة)
3. [هيكل المشروع](#3-هيكل-المشروع)
4. [قاعدة البيانات](#4-قاعدة-البيانات)
5. [علاقات البيانات (ER Diagram)](#5-علاقات-البيانات-er-diagram)
6. [واجهات الـ API](#6-واجهات-الـ-api)
7. [المصادقة والتفويض](#7-المصادقة-والتفويض)
8. [الـ Middleware](#8-الـ-middleware)
9. [الخدمات الخارجية (Services)](#9-الخدمات-الخارجية-services)
10. [متغيرات البيئة](#10-متغيرات-البيئة)
11. [تشغيل السيرفر](#11-تشغيل-السيرفر)
12. [ربط الفرونت اند بالباك اند](#12-ربط-الفرونت-اند-بالباك-اند)
13. [مخطط المعمارية](#13-مخطط-المعمارية)
14. [ملاحظات وقيود حالية](#14-ملاحظات-وقيود-حالية)

---

## 1. نظرة عامة

**Grovia** هو تطبيق استثماري (Full-Stack) يتكون من:

| الجزء | التقنية | المنفذ الافتراضي |
|-------|---------|-----------------|
| **Frontend** | React 19 + Vite | `5173` |
| **Backend** | Node.js + Express 5 | `5000` |
| **Database** | MongoDB Atlas | — |

الباك اند عبارة عن **REST API** بسيط ومسطح (flat architecture) — لا يوجد طبقة Controllers منفصلة، والمنطق موجود مباشرة داخل ملفات الـ Routes.

**عدد ملفات الباك اند:** 14 ملف  
**عدد الـ Models:** 4  
**عدد الـ Endpoints:** 10 (+ health check)

---

## 2. التقنيات المستخدمة

| الح package | الإصدار | الاستخدام |
|-------------|---------|-----------|
| `express` | ^5.2.1 | إطار عمل الـ HTTP server |
| `mongoose` | ^9.9.4 | ODM للتعامل مع MongoDB |
| `bcryptjs` | ^3.0.3 | تشفير كلمات المرور |
| `jsonwebtoken` | ^9.0.3 | إصدار والتحقق من JWT tokens |
| `cors` | ^2.8.6 | السماح للفرونت اند بالاتصال |
| `morgan` | ^1.12.0 | تسجيل طلبات HTTP |
| `dotenv` | ^17.4.2 | تحميل متغيرات البيئة |
| `axios` | ^1.20.0 | طلبات HTTP للـ APIs الخارجية |

> **ملاحظة:** لا يوجد Prisma، Sequelize، TypeORM، أو ملفات migrations — الـ schema يُعرَّف في الكود ويُطبَّق تلقائياً عند التشغيل.

---

## 3. هيكل المشروع

```
Grovia/
├── package.json                 # dependencies + scripts
├── vite.config.js               # proxy: /api → localhost:5000
├── docs/
│   └── BACKEND.md               # هذا الملف
└── server/
    ├── index.js                 # نقطة الدخول — Express app
    ├── .env.example             # قالب متغيرات البيئة
    ├── config/
    │   └── db.js                # اتصال MongoDB
    ├── models/                  # Mongoose schemas
    │   ├── User.js
    │   ├── Wallet.js
    │   ├── Transaction.js
    │   └── Holding.js
    ├── routes/                  # Express routers
    │   ├── auth.js              # تسجيل / دخول
    │   ├── profile.js           # الملف الشخصي
    │   ├── wallet.js            # المحفظة والمعاملات
    │   └── market.js            # أسعار السوق
    ├── middleware/
    │   ├── auth.js              # JWT verification
    │   └── errors.js            # 404 + error handler
    └── services/
        └── marketService.js     # Alpha Vantage + EGX API
```

---

## 4. قاعدة البيانات

### 4.1 الاتصال

**الملف:** `server/config/db.js`

```javascript
// يقرأ MONGODB_URI من server/.env
// يتصل بـ MongoDB Atlas
// يوقف السيرفر (exit 1) إذا فشل الاتصال
```

| الإعداد | القيمة |
|---------|--------|
| **نوع DB** | MongoDB (Atlas Cloud) |
| **اسم Database** | `grovia` (في URI) |
| **ODM** | Mongoose 9 |
| **Migrations** | ❌ غير موجودة |

---

### 4.2 Model: User

**الملف:** `server/models/User.js`  
**Collection:** `users`

| الحقل | النوع | القيود | الوصف |
|-------|------|--------|-------|
| `fullName` | String | required, max 100 | الاسم الكامل |
| `email` | String | required, unique, lowercase | البريد الإلكتروني |
| `passwordHash` | String | required, `select: false` | كلمة المرور المشفرة (مخفية افتراضياً) |
| `phone` | String | default `""` | رقم الهاتف |
| `location` | String | default `""` | الموقع |
| `occupation` | String | default `""` | المهنة |
| `investorSince` | Date | default `Date.now` | تاريخ بدء الاستثمار |
| `riskProfile` | String | enum: `Conservative`, `Balanced`, `Growth` | ملف المخاطر |
| `investmentHorizon` | String | default `"5-10 years"` | أفق الاستثمار |
| `primaryGoal` | String | default `"Long-term growth"` | الهدف الأساسي |
| `createdAt` | Date | auto (timestamps) | تاريخ الإنشاء |
| `updatedAt` | Date | auto (timestamps) | تاريخ آخر تحديث |

**أمان:** `passwordHash` يُحذف تلقائياً عند تحويل الـ document إلى JSON.

---

### 4.3 Model: Wallet

**الملف:** `server/models/Wallet.js`  
**Collection:** `wallets`

| الحقل | النوع | القيود | الوصف |
|-------|------|--------|-------|
| `user` | ObjectId → User | required, **unique** | المستخدم (محفظة واحدة لكل مستخدم) |
| `currency` | String | default `"EGP"` | العملة |
| `availableBalance` | Number | default `45210.49`, min 0 | الرصيد المتاح |
| `investedBalance` | Number | default `79110.91`, min 0 | الرصيد المستثمر |
| `linkedAccounts` | Array | — | الحسابات البنكية المرتبطة |
| `linkedAccounts[].bankName` | String | — | اسم البنك |
| `linkedAccounts[].accountType` | String | — | نوع الحساب |
| `linkedAccounts[].last4` | String | — | آخر 4 أرقام |
| `createdAt`, `updatedAt` | Date | auto | timestamps |

> **ملاحظة:** المحفظة تُنشأ تلقائياً عند التسجيل (`auth.js`). الأرصدة الافتراضية hardcoded في الـ schema.

---

### 4.4 Model: Transaction

**الملف:** `server/models/Transaction.js`  
**Collection:** `transactions`

| الحقل | النوع | القيود | الوصف |
|-------|------|--------|-------|
| `user` | ObjectId → User | required, indexed | المستخدم |
| `type` | String | enum (انظر أدناه), required | نوع المعاملة |
| `title` | String | required | عنوان المعاملة |
| `amount` | Number | required | المبلغ |
| `currency` | String | default `"EGP"` | العملة |
| `category` | String | default `"General"` | التصنيف |
| `occurredAt` | Date | default `Date.now` | تاريخ حدوث المعاملة |
| `createdAt`, `updatedAt` | Date | auto | timestamps |

**أنواع المعاملات (`type`):**

| القيمة | الوصف |
|--------|-------|
| `deposit` | إيداع |
| `withdrawal` | سحب |
| `transfer` | تحويل |
| `buy` | شراء |
| `sell` | بيع |
| `dividend` | أرباح موزعة |

---

### 4.5 Model: Holding

**الملف:** `server/models/Holding.js`  
**Collection:** `holdings`

| الحقل | النوع | القيود | الوصف |
|-------|------|--------|-------|
| `user` | ObjectId → User | required, indexed | المستخدم |
| `symbol` | String | required, uppercase | رمز السهم |
| `name` | String | required | اسم الشركة/الأصل |
| `market` | String | enum: `EGX`, `US`, `OTHER` | السوق |
| `quantity` | Number | required, min 0 | الكمية |
| `averageCost` | Number | required, min 0 | متوسط سعر الشراء |
| `currency` | String | default `"EGP"` | العملة |
| `createdAt`, `updatedAt` | Date | auto | timestamps |

**Index مركب:** `{ user: 1, symbol: 1 }` — unique (holding واحد لكل symbol لكل مستخدم).

---

## 5. علاقات البيانات (ER Diagram)

```mermaid
erDiagram
    User ||--o| Wallet : "has one"
    User ||--o{ Transaction : "has many"
    User ||--o{ Holding : "has many"

    User {
        ObjectId _id PK
        string fullName
        string email UK
        string passwordHash
        string phone
        string location
        string occupation
        date investorSince
        string riskProfile
        string investmentHorizon
        string primaryGoal
        date createdAt
        date updatedAt
    }

    Wallet {
        ObjectId _id PK
        ObjectId user FK_UK
        string currency
        number availableBalance
        number investedBalance
        array linkedAccounts
        date createdAt
        date updatedAt
    }

    Transaction {
        ObjectId _id PK
        ObjectId user FK
        string type
        string title
        number amount
        string currency
        string category
        date occurredAt
        date createdAt
        date updatedAt
    }

    Holding {
        ObjectId _id PK
        ObjectId user FK
        string symbol
        string name
        string market
        number quantity
        number averageCost
        string currency
        date createdAt
        date updatedAt
    }
```

### ملخص العلاقات

| العلاقة | النوع | التنفيذ |
|---------|-------|---------|
| User → Wallet | **1:1** | `Wallet.user` unique |
| User → Transaction | **1:N** | `Transaction.user` indexed |
| User → Holding | **1:N** | compound unique index على `user + symbol` |

**ملاحظات:**
- لا يوجد `populate()` في الـ routes — الاستعلامات تستخدم ObjectId مباشرة
- لا يوجد cascade delete — حذف مستخدم يدوياً يترك سجلات يتيمة
- المحفظة تُنشأ تلقائياً عند التسجيل

---

## 6. واجهات الـ API

**Base URL:** `http://localhost:5000/api`  
**في التطوير:** Vite يعمل proxy من `/api` → `localhost:5000`

### 6.1 Health Check

| Method | Path | Auth | الوصف |
|--------|------|------|-------|
| `GET` | `/api/health` | ❌ | فحص حالة السيرفر |

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-09-05T02:26:00.000Z"
}
```

---

### 6.2 Auth — `/api/auth`

**الملف:** `server/routes/auth.js`

#### POST `/api/auth/register`

إنشاء حساب جديد + محفظة تلقائياً.

| | |
|---|---|
| **Auth** | ❌ غير مطلوب |
| **Body** | `{ fullName, email, password }` |
| **Validation** | password ≥ 8 أحرف |

**Response `201`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "fullName": "أحمد محمد",
    "email": "ahmed@example.com",
    "riskProfile": "Balanced",
    ...
  }
}
```

**Errors:**

| Status | السبب |
|--------|-------|
| `400` | بيانات ناقصة أو password أقل من 8 |
| `409` | البريد مستخدم مسبقاً |

---

#### POST `/api/auth/login`

| | |
|---|---|
| **Auth** | ❌ غير مطلوب |
| **Body** | `{ email, password }` |

**Response `200`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

**Errors:**

| Status | السبب |
|--------|-------|
| `401` | بريد أو كلمة مرور خاطئة |

---

### 6.3 Profile — `/api/profile`

**الملف:** `server/routes/profile.js`  
**Auth:** ✅ جميع الـ routes محمية

#### GET `/api/profile/me`

جلب بيانات المستخدم الحالي.

**Response `200`:**
```json
{
  "user": {
    "_id": "...",
    "fullName": "...",
    "email": "...",
    ...
  }
}
```

---

#### PATCH `/api/profile/me`

تحديث الملف الشخصي.

**Body (الحقول المسموحة فقط):**
```json
{
  "fullName": "string",
  "phone": "string",
  "location": "string",
  "occupation": "string",
  "riskProfile": "Conservative | Balanced | Growth",
  "investmentHorizon": "string",
  "primaryGoal": "string"
}
```

**Response `200`:**
```json
{ "user": { ... } }
```

---

### 6.4 Wallet — `/api/wallet`

**الملف:** `server/routes/wallet.js`  
**Auth:** ✅ جميع الـ routes محمية

#### GET `/api/wallet/`

جلب بيانات المحفظة الكاملة.

**Response `200`:**
```json
{
  "wallet": {
    "_id": "...",
    "user": "...",
    "currency": "EGP",
    "availableBalance": 45210.49,
    "investedBalance": 79110.91,
    "linkedAccounts": []
  },
  "transactions": [ /* آخر 20 معاملة */ ],
  "holdings": [ /* جميع الاستثمارات */ ],
  "portfolioValue": 125000.00
}
```

> `portfolioValue` = مجموع `(quantity × averageCost)` لكل holding — **ليس** السعر الحالي في السوق.

---

#### POST `/api/wallet/transactions`

إنشاء معاملة جديدة.

**Body:**
```json
{
  "type": "deposit",
  "title": "إيداع بنكي",
  "amount": 5000,
  "category": "General",
  "occurredAt": "2026-09-05T00:00:00.000Z"
}
```

| الحقل | مطلوب | الوصف |
|-------|-------|-------|
| `type` | ✅ | نوع المعاملة (انظر enum أعلاه) |
| `title` | ✅ | عنوان المعاملة |
| `amount` | ✅ | رقم |
| `category` | ❌ | default `"General"` |
| `occurredAt` | ❌ | default `Date.now` |

**Response `201`:**
```json
{ "transaction": { ... } }
```

---

### 6.5 Market — `/api/market`

**الملف:** `server/routes/market.js`  
**Auth:** ❌ مفتوح للجميع

#### GET `/api/market/alpha/:symbol`

سعر سهم US/Global من Alpha Vantage.

**مثال:** `GET /api/market/alpha/AAPL`

**Response `200`:**
```json
{
  "quote": {
    "symbol": "AAPL",
    "price": 175.43,
    "change": 2.15,
    "changePercent": "1.24%",
    "updatedAt": "2026-09-04",
    "source": "Alpha Vantage",
    "delayed": true
  }
}
```

---

#### GET `/api/market/egx/:symbol`

سعر سهم EGX من EGX API.

**مثال:** `GET /api/market/egx/COMI`

**Response `200`:**
```json
{
  "quote": {
    "...": "...",
    "source": "EGXAPI",
    "environment": "paper"
  }
}
```

---

### 6.6 جدول ملخص الـ Endpoints

| Method | Path | Auth | الوصف |
|--------|------|------|-------|
| GET | `/api/health` | ❌ | Health check |
| POST | `/api/auth/register` | ❌ | تسجيل حساب |
| POST | `/api/auth/login` | ❌ | تسجيل دخول |
| GET | `/api/profile/me` | ✅ | جلب الملف الشخصي |
| PATCH | `/api/profile/me` | ✅ | تحديث الملف الشخصي |
| GET | `/api/wallet/` | ✅ | بيانات المحفظة |
| POST | `/api/wallet/transactions` | ✅ | إنشاء معاملة |
| GET | `/api/market/alpha/:symbol` | ❌ | سعر US/Global |
| GET | `/api/market/egx/:symbol` | ❌ | سعر EGX |

---

## 7. المصادقة والتفويض

### 7.1 آلية العمل

```
Client                          Server
  │                               │
  │  POST /auth/login             │
  │  { email, password }          │
  │ ─────────────────────────────>│
  │                               │ bcrypt.compare()
  │                               │ jwt.sign({ sub: userId })
  │  { token, user }              │
  │ <─────────────────────────────│
  │                               │
  │  GET /profile/me              │
  │  Authorization: Bearer <token>│
  │ ─────────────────────────────>│
  │                               │ jwt.verify()
  │                               │ User.findById()
  │  { user }                     │
  │ <─────────────────────────────│
```

### 7.2 JWT Token

| الإعداد | القيمة |
|---------|--------|
| **Algorithm** | HS256 (default) |
| **Payload** | `{ sub: userId }` |
| **Secret** | `JWT_SECRET` من `.env` |
| **Expiry** | `JWT_EXPIRES_IN` (default: `7d`) |
| **Header** | `Authorization: Bearer <token>` |

### 7.3 تشفير كلمة المرور

| الإعداد | القيمة |
|---------|--------|
| **Library** | bcryptjs |
| **Salt rounds** | 12 |
| **Storage** | `passwordHash` field (مخفي بـ `select: false`) |

### 7.4 Routes المحمية vs المفتوحة

| محمية (requireAuth) | مفتوحة |
|---------------------|--------|
| `/api/profile/*` | `/api/health` |
| `/api/wallet/*` | `/api/auth/*` |
| | `/api/market/*` |

### 7.5 نموذج التفويض

- **لا يوجد roles/permissions** — كل مستخدم يرى بياناته فقط عبر `req.user.id`
- **لا يوجد admin routes**
- **لا يوجد refresh tokens**
- **لا يوجد password reset / email verification**

### 7.6 التخزين في الفرونت اند

**الملف:** `src/utils/auth.js`

| Key | Storage | الوصف |
|-----|---------|-------|
| `grovia_token` | localStorage / sessionStorage | JWT token |
| `grovia_user` | localStorage / sessionStorage | بيانات المستخدم cached |

- `rememberMe = true` → localStorage (يبقى بعد إغلاق المتصفح)
- `rememberMe = false` → sessionStorage (يُمسح عند إغلاق التاب)

---

## 8. الـ Middleware

### 8.1 Global Middleware (في `index.js`)

| Middleware | الإعداد | الوظيفة |
|------------|---------|---------|
| `cors` | origin: `CLIENT_URL` أو `localhost:5173` | CORS |
| `express.json` | limit: 1MB | parse JSON body |
| `morgan` | `"dev"` | HTTP request logging |

### 8.2 `requireAuth` — `server/middleware/auth.js`

```javascript
// 1. استخراج token من Authorization header
// 2. jwt.verify(token, JWT_SECRET)
// 3. User.findById(payload.sub)
// 4. req.user = user
// 5. next() أو 401
```

**Errors:**

| Status | Message |
|--------|---------|
| `401` | `"Authentication required."` |
| `401` | `"Invalid or expired token."` |
| `401` | `"User no longer exists."` |

### 8.3 Error Handlers — `server/middleware/errors.js`

| Handler | الوظيفة |
|---------|---------|
| `notFound` | 404 لأي route غير معروف |
| `errorHandler` | Mongoose ValidationError → 400، غيرها → 500 |

---

## 9. الخدمات الخارجية (Services)

### 9.1 Market Service — `server/services/marketService.js`

#### Alpha Vantage (US/Global Stocks)

| | |
|---|---|
| **Endpoint** | `https://www.alphavantage.co/query` |
| **Function** | `GLOBAL_QUOTE` |
| **API Key** | `ALPHA_VANTAGE_API_KEY` |
| **Timeout** | 10 seconds |
| **Cache TTL** | 15 minutes (in-memory Map) |

#### EGX API (Egyptian Exchange)

| | |
|---|---|
| **Endpoint** | `{EGX_API_BASE_URL}/market/quotes/{symbol}` |
| **Default Base** | `https://api.egxapi.com/v2` |
| **Auth** | `Bearer {EGX_API_KEY}` |
| **Header** | `X-EGX-Env: paper` |
| **Timeout** | 10 seconds |
| **Cache TTL** | 15 minutes |

#### Caching

```javascript
// In-memory Map cache
// Key: "alpha:AAPL" أو "egx:COMI"
// TTL: 15 * 60 * 1000 ms (15 دقيقة)
// لا يوجد Redis أو cache layer خارجي
```

---

## 10. متغيرات البيئة

**الملف:** `server/.env` (انسخ من `server/.env.example`)

| المتغير | مطلوب | الوصف | مثال |
|---------|-------|-------|------|
| `PORT` | ❌ | منفذ السيرفر | `5000` |
| `NODE_ENV` | ❌ | البيئة | `development` |
| `CLIENT_URL` | ❌ | CORS origin | `http://localhost:5173` |
| `MONGODB_URI` | ✅ | MongoDB connection string | `mongodb+srv://...` |
| `DNS_SERVERS` | ❌ | DNS مخصص (للاتصال بـ Atlas) | `1.1.1.1,8.8.8.8` |
| `JWT_SECRET` | ✅ | JWT signing secret | string عشوائي طويل |
| `JWT_EXPIRES_IN` | ❌ | مدة صلاحية Token | `7d` |
| `ALPHA_VANTAGE_API_KEY` | ❌ | Alpha Vantage API | — |
| `EGX_API_KEY` | ❌ | EGX API token | — |
| `EGX_API_BASE_URL` | ❌ | EGX API base URL | `https://api.egxapi.com/v2` |

**Frontend:**

| المتغير | الوصف | Default |
|---------|-------|---------|
| `VITE_API_URL` | Base URL للـ API | `/api` (Vite proxy) |

> ⚠️ **أمان:** لا تضع credentials حقيقية في `.env.example` — استخدم placeholders فقط.

---

## 11. تشغيل السيرفر

### 11.1 الإعداد الأول

```bash
# 1. تثبيت dependencies
npm install

# 2. إنشاء ملف البيئة
cp server/.env.example server/.env
# عدّل القيم في server/.env

# 3. تشغيل السيرفر (مع hot reload)
npm run server

# أو بدون watch
npm run server:start
```

### 11.2 تشغيل Full-Stack (Development)

```bash
# Terminal 1 — Backend
npm run server

# Terminal 2 — Frontend
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:5000/api` |
| Health Check | `http://localhost:5000/api/health` |

### 11.3 Vite Proxy

في `vite.config.js`:
```javascript
server: { proxy: { "/api": "http://localhost:5000" } }
```

الفرونت اند يستدعي `/api/...` → Vite يوجّه تلقائياً للباك اند.

---

## 12. ربط الفرونت اند بالباك اند

### 12.1 API Client

**الملف:** `src/utils/api.js`

```javascript
// apiRequest(path, options)
// - يضيف Authorization: Bearer <token> تلقائياً
// - baseUrl = VITE_API_URL || "/api"
// - يرمي Error إذا response.ok === false
```

### 12.2 الصفحات المتصلة بالـ API

| الصفحة/Component | Endpoints |
|------------------|-----------|
| `Login.jsx` | `POST /auth/login` |
| `Register.jsx` | `POST /auth/register` |
| `ProfilePage.jsx` | `GET /profile/me`, `PATCH /profile/me` |

### 12.3 الصفحات التي تستخدم Mock Data (لم تُربط بعد)

| الصفحة | ملف البيانات |
|--------|-------------|
| `Wallet.jsx` | `src/data/walletData.js` |
| `Dashboard.jsx` | `src/data/dashboardData.js` |
| `Portfolio.jsx` | `src/data/portfolioData.js` |
| `Market.jsx` | `src/data/marketData.js` |
| `Opportunities.jsx` | `src/data/opportunitiesData.js` |

> الـ endpoints جاهزة (`/api/wallet/*`, `/api/market/*`) لكن الفرونت اند لم يُحدَّث لاستخدامها بعد.

---

## 13. مخطط المعمارية

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (:5173)                    │
│  src/utils/api.js  →  Bearer Token  →  /api proxy          │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP
┌────────────────────────────▼────────────────────────────────┐
│                  Express 5 Server (:5000)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  /auth   │ │ /profile │ │ /wallet  │ │ /market  │         │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘         │
│       │            │ requireAuth │            │              │
│  ┌────▼────────────▼─────────────▼────┐  ┌───▼────────┐      │
│  │         Mongoose Models             │  │ marketSvc  │      │
│  │  User │ Wallet │ Transaction │ Holding│  └───┬────────┘      │
│  └────────────────┬───────────────────┘      │              │
└───────────────────┼────────────────────────────┼──────────────┘
                    │                            │
         ┌──────────▼──────────┐      ┌──────────▼──────────┐
         │   MongoDB Atlas      │      │  Alpha Vantage      │
         │   (grovia database)  │      │  EGX API (paper)    │
         └─────────────────────┘      └─────────────────────┘
```

---

## 14. ملاحظات وقيود حالية

### ✅ ما هو موجود

- [x] تسجيل / دخول مع JWT
- [x] إدارة الملف الشخصي
- [x] CRUD للمحفظة والمعاملات
- [x] أسعار السوق (Alpha Vantage + EGX)
- [x] In-memory caching للأسعار

### ❌ ما هو غير موجود

| الميزة | الحالة |
|--------|--------|
| Database migrations | ❌ |
| Controllers layer | ❌ (logic في routes) |
| Refresh tokens | ❌ |
| Password reset | ❌ |
| Email verification | ❌ |
| Roles / Permissions | ❌ |
| Rate limiting | ❌ |
| Email service | ❌ |
| Payment integration | ❌ |
| File storage (S3, etc.) | ❌ |
| OAuth / Social login | ❌ |
| WebSockets / Real-time | ❌ |
| Redis cache | ❌ |
| Seed scripts | ❌ |
| Cascade delete | ❌ |
| Unit / Integration tests | ❌ |

### ⚠️ نقاط تحتاج انتباه

1. **أرصدة المحفظة الافتراضية hardcoded** في Wallet schema (45210.49 / 79110.91)
2. **Market routes مفتوحة** — لا rate limiting على proxy endpoints
3. **portfolioValue** يحسب من averageCost وليس السعر الحالي
4. **إنشاء transaction لا يحدّث** availableBalance أو investedBalance
5. **`.env.example` يحتوي credentials** — يجب استبدالها بـ placeholders
6. **Frontend غير مربوط** بمعظم endpoints (Wallet, Market, Dashboard)

---

## فهرس الملفات

| المسار | الدور |
|--------|------|
| `server/index.js` | نقطة الدخول، route mounting |
| `server/config/db.js` | اتصال MongoDB |
| `server/models/User.js` | User schema |
| `server/models/Wallet.js` | Wallet schema |
| `server/models/Transaction.js` | Transaction schema |
| `server/models/Holding.js` | Holding schema |
| `server/routes/auth.js` | Register / Login |
| `server/routes/profile.js` | Profile CRUD |
| `server/routes/wallet.js` | Wallet + Transactions |
| `server/routes/market.js` | Market quote proxy |
| `server/middleware/auth.js` | JWT middleware |
| `server/middleware/errors.js` | Error handlers |
| `server/services/marketService.js` | External market APIs |
| `server/.env.example` | Environment template |

---

*تم إنشاء هذا التوثيق تلقائياً بناءً على تحليل الكود المصدري.*
