# 🏥 Xynaps - Plan de Implementación

## 📋 Descripción del Proyecto

**Xynaps** es una aplicación de inteligencia artificial para médicos que incluye:

- **Medical Query**: Responde preguntas médicas con IA
- **Clinical Simulation**: Crea simulaciones para entrenamiento médico
- **Idioma**: Inglés por defecto
- **Autenticación**: OAuth exclusivamente (Google y Microsoft)
- **Base de Datos**: Supabase (chats, imágenes, usuarios)
- **UI**: shadcn/ui
- **IA**: Gemini 2.5 Pro (producción) / Gemini 2.5 Flash Lite (desarrollo)
- **Streaming**: Respuestas en tiempo real
- **Pagos**: PayPal (7 días gratis, $10/mes, $50/mes)

---

## 🏗️ Arquitectura del Sistema

```
Xynaps/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 15)
│   │   ├── 📁 page.tsx           # Página informativa principal con login
│   │   ├── 📁 (auth)/            # Rutas protegidas
│   │   │   ├── 📁 dashboard/     # Panel principal
│   │   │   ├── 📁 chat/          # Chat médico
│   │   │   ├── 📁 simulations/   # Simulaciones clínicas
│   │   │   └── 📁 history/       # Historial de consultas
│   │   ├── 📁 api/               # API Routes
│   │   │   ├── 📁 auth/          # Autenticación
│   │   │   ├── 📁 chat/          # Chat streaming
│   │   │   ├── 📁 simulations/   # Simulaciones
│   │   │   └── 📁 webhooks/      # PayPal webhooks
│   │   └── 📁 globals.css
│   ├── 📁 components/            # Componentes UI
│   │   ├── 📁 ui/               # shadcn/ui components
│   │   ├── 📁 landing/          # Componentes de página informativa
│   │   ├── 📁 chat/             # Componentes de chat
│   │   ├── 📁 auth/             # Componentes de auth
│   │   └── 📁 layout/           # Layout components
│   ├── 📁 lib/                  # Utilidades y configuraciones
│   │   ├── 📁 auth/             # Lógica de autenticación
│   │   ├── 📁 ai/               # Configuración de Gemini
│   │   ├── 📁 supabase/         # Cliente y tipos de Supabase
│   │   ├── 📁 paypal/           # Integración PayPal
│   │   └── 📁 utils/            # Utilidades generales
│   ├── 📁 hooks/                # Custom hooks
│   ├── 📁 types/                # TypeScript types
│   └── 📁 styles/               # Estilos adicionales
```

---

## 📅 Fases de Implementación

### **Fase 1: Configuración Base (Semana 1)** ✅ **COMPLETADA**

#### **✅ Componentes Implementados:**
- [x] **shadcn/ui**: Instalación y configuración completa
- [x] **AppLogo**: Componente de logo con fallback y soporte para diferentes tamaños
- [x] **Header**: Navegación responsive con logo y botón de login
- [x] **HeroSection**: Sección principal con título, descripción y botones CTA
- [x] **FeaturesSection**: 6 características principales con iconos y descripciones
- [x] **PricingSection**: 3 planes de precios (Free Trial, Basic, Premium)
- [x] **Footer**: Enlaces, redes sociales e información legal
- [x] **LoginModal**: Modal profesional con Dialog de shadcn/ui
- [x] **OAuthLogin**: Botones para Google y Microsoft OAuth

#### **✅ Características Implementadas:**
- [x] **Diseño Responsive**: Funciona perfectamente en móviles y desktop
- [x] **Componentes shadcn/ui**: Uso consistente de la librería oficial
- [x] **Navegación Completa**: Header con menú hamburguesa en móviles
- [x] **Login Modal**: Modal profesional con OAuth buttons
- [x] **Landing Page Completa**: Hero, Features, Pricing, Footer
- [x] **Logo Integrado**: Uso del logo real xynaps_logo.png
- [x] **Idioma Inglés**: Toda la aplicación en inglés
- [x] **Client Components**: Conversión de AppLogo a Client Component para manejar eventos
- [x] **Supabase Integration**: Cliente configurado, tipos TypeScript, migraciones aplicadas
- [x] **Authentication System**: useAuth hook, OAuth callback, middleware, session persistence
- [x] **Dashboard Structure**: Protected routes, AuthProvider, basic dashboard components
- [x] **Environment Variables**: Fixed configuration and proper loading

#### **✅ Estructura de Archivos Creada:**
```
src/
├── app/
│   ├── page.tsx                    # Página principal con landing
│   ├── layout.tsx                  # Layout con AuthProvider
│   ├── auth/callback/route.ts      # OAuth callback handler
│   └── dashboard/page.tsx          # Dashboard protegido
├── components/
│   ├── ui/
│   │   ├── button.tsx             # shadcn/ui Button
│   │   ├── dialog.tsx             # shadcn/ui Dialog
│   │   ├── sheet.tsx              # shadcn/ui Sheet
│   │   └── AppLogo.tsx            # Logo component
│   ├── landing/
│   │   ├── HeroSection.tsx        # Sección principal
│   │   ├── FeaturesSection.tsx    # Características
│   │   └── PricingSection.tsx     # Planes y precios
│   ├── auth/
│   │   ├── LoginModal.tsx         # Modal de login
│   │   └── OAuthLogin.tsx         # Botones OAuth
│   ├── layout/
│   │   ├── Header.tsx             # Navegación
│   │   └── Footer.tsx             # Footer
│   ├── dashboard/
│   │   ├── DashboardHeader.tsx    # Header del dashboard
│   │   └── DashboardSidebar.tsx   # Sidebar del dashboard
│   └── providers/
│       └── AuthProvider.tsx       # Context provider para auth
├── lib/
│   └── supabase/
│       ├── client.ts              # Cliente Supabase
│       └── server.ts              # Cliente Supabase para servidor
├── hooks/
│   └── useAuth.ts                 # Hook de autenticación
├── types/
│   └── supabase.ts                # Tipos TypeScript para DB
└── middleware.ts                  # Middleware para protección de rutas
```

### **Fase 2: Autenticación y Usuario (Semana 2)** ✅ **COMPLETADA**

#### **✅ Componentes Implementados:**
- [x] **OAuth Implementation**: Google y Microsoft OAuth configurados
- [x] **User Profile System**: Sistema de perfiles de usuario con Supabase
- [x] **Authentication Middleware**: Middleware de autenticación implementado
- [x] **OAuth Login Pages**: Páginas de login OAuth (sin email/password)
- [x] **Basic Dashboard**: Dashboard básico del usuario
- [x] **Logo Configuration**: Configurar logo de la aplicación (xynaps_logo.png)
- [x] **Session Persistence System**:
  - [x] Configurar refresh tokens automáticos
  - [x] Implementar almacenamiento seguro de sesión
  - [x] Sistema de auto-login en recarga de página
  - [x] Gestión de tokens de acceso persistentes
  - [x] Middleware de verificación de sesión
- [x] **Role and Permission System**:
  - [x] Implementar roles predefinidos (admin, user, subscriber)
  - [x] Sistema de permisos granular
  - [x] Middleware de autorización basado en roles
  - [x] Validación de permisos en componentes

#### **✅ Fase 2 Completada:**
- [x] **Configurar Supabase** con autenticación OAuth
- [x] **Implementar OAuth** (Google y Microsoft)
- [x] **Sistema de roles** (admin, user, subscriber)
- [x] **Sistema de persistencia de sesión**
- [x] **Dashboard básico** del usuario
- [x] **Middleware de autenticación** y protección de rutas
- [x] **AuthProvider** para contexto global de autenticación
- [x] **Tipos TypeScript** para el esquema de Supabase
- [x] **Migraciones de base de datos** aplicadas al proyecto

#### **📋 Próximos Pasos Inmediatos:**
1. **Configurar OAuth providers** en Supabase Dashboard (Google y Microsoft)
2. **Probar autenticación** con Google/Microsoft
3. **Implementar sistema de notificaciones** (toast, error handling)
4. **Crear páginas adicionales** (Settings, History, etc.)
5. **Iniciar Fase 3: AI Agents** (Medical Query y Clinical Simulation)

### **Fase 3: Medical Query (Semana 3-4)**
- [ ] Implementar chat con streaming
- [ ] Soporte para texto, audio e imágenes
- [ ] Historial de conversaciones
- [ ] Sistema de prompts para consultas médicas
- [ ] Interfaz de chat responsive
- [ ] **Sistema de memoria y contexto**
  - [ ] Implementar contexto de conversación
  - [ ] Memoria de paciente y historial médico
  - [ ] Sistema de resúmenes automáticos
  - [ ] Gestión de contexto por especialidad
  - [ ] Memoria persistente entre sesiones
- [ ] **Títulos automáticos y detección de idioma**
  - [ ] Generación automática de títulos con IA
  - [ ] Detección automática de idioma del usuario
  - [ ] Respuestas en el idioma del usuario
  - [ ] Sistema de traducción para casos especiales
- [ ] **Sistema de notificaciones**
  - [ ] Notificaciones de éxito, error, advertencia
  - [ ] Notificaciones para acciones de usuario
  - [ ] Notificaciones para errores de autenticación
  - [ ] Notificaciones para eliminación de conversaciones

### **Fase 4: Clinical Simulation (Semana 5-6)**
- [ ] Implementar agente de simulaciones
- [ ] Sistema de escenarios clínicos
- [ ] Interfaz de simulación interactiva
- [ ] Historial de simulaciones
- [ ] Sistema de evaluación
- [ ] **Memoria de simulaciones**
  - [ ] Contexto de escenarios previos
  - [ ] Memoria de progreso del usuario
  - [ ] Adaptación basada en historial
  - [ ] Sistema de dificultad dinámica
  - [ ] Memoria de casos clínicos complejos

### **Fase 5: Sistema de Pagos (Semana 7)**
- [ ] Integración con PayPal
- [ ] Sistema de suscripciones
- [ ] Planes de pago (gratuito 7 días, $10, $50)
- [ ] Webhooks de PayPal
- [ ] Gestión de suscripciones

### **Fase 6: Optimización y Testing (Semana 8)**
- [ ] Testing completo
- [ ] Optimización de rendimiento
- [ ] SEO y meta tags
- [ ] Documentación
- [ ] Deployment

---

## 🗄️ Base de Datos (Supabase)

### **Tabla: profiles**
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  specialty TEXT,
  role TEXT CHECK (role IN ('admin', 'user', 'subscriber')) DEFAULT 'user',
  subscription_status TEXT DEFAULT 'free',
  subscription_end_date TIMESTAMP,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: roles**
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: user_roles**
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES profiles(id),
  assigned_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(user_id, role_id)
);
```

### **Tabla: chats**
```sql
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT, -- Auto-generated title based on first message
  original_title TEXT, -- Original user query for reference
  type TEXT CHECK (type IN ('consultation', 'simulation')),
  language TEXT DEFAULT 'en', -- Detected language (en, es, fr, etc.)
  status TEXT DEFAULT 'active', -- active, archived, deleted
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: messages**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant')),
  content TEXT,
  audio_url TEXT,
  image_url TEXT,
  metadata JSONB, -- Store context, medical data, patient info
  context_summary TEXT, -- AI-generated summary for context
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: chat_contexts**
```sql
CREATE TABLE chat_contexts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  context_type TEXT CHECK (context_type IN ('patient_info', 'medical_history', 'specialty_context', 'simulation_scenario')),
  context_data JSONB, -- Structured context data
  context_summary TEXT, -- AI-generated summary
  importance_score INTEGER DEFAULT 1, -- 1-10 scale for context importance
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: agent_memories**
```sql
CREATE TABLE agent_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  agent_type TEXT CHECK (agent_type IN ('medical_query', 'clinical_simulation')),
  memory_key TEXT, -- Key for memory retrieval
  memory_data JSONB, -- Structured memory data
  memory_summary TEXT, -- AI-generated summary
  importance_score INTEGER DEFAULT 1, -- 1-10 scale
  last_accessed TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: subscriptions**
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  paypal_subscription_id TEXT,
  plan_type TEXT CHECK (plan_type IN ('basic', 'premium')),
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: notifications**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  type TEXT CHECK (type IN ('success', 'error', 'warning', 'info')),
  title TEXT,
  message TEXT,
  action_url TEXT, -- Optional URL for action
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ⚙️ Configuración de Entorno

### **Variables de Entorno (.env.local)**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google AI (Gemini)
GOOGLE_AI_API_KEY=your_gemini_api_key
GOOGLE_AI_MODEL_PROD=gemini-2.5-pro
GOOGLE_AI_MODEL_DEV=gemini-2.5-flash-lite

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_WEBHOOK_ID=your_webhook_id

# OAuth (Exclusivamente)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

# Assets
NEXT_PUBLIC_APP_LOGO=/xynaps_logo.png
```

---

## 🧩 Estructura de Componentes

```
components/
├── ui/                    # shadcn/ui components
├── landing/               # Página informativa principal
│   ├── HeroSection.tsx    # Sección principal con login
│   ├── FeaturesSection.tsx # Características del producto
│   ├── PricingSection.tsx # Planes y precios
│   ├── AboutSection.tsx   # Información sobre la empresa
│   ├── ContactSection.tsx # Información de contacto
│   └── LoginModal.tsx     # Modal de login OAuth
├── medical-query/
│   ├── QueryInterface.tsx
│   ├── MessageBubble.tsx
│   ├── AudioRecorder.tsx
│   ├── ImageUpload.tsx
│   ├── QueryHistory.tsx
│   ├── ContextPanel.tsx   # Context and memory display
│   └── QueryTitle.tsx     # Auto-generated title display
├── auth/
│   ├── OAuthLogin.tsx     # OAuth login buttons
│   ├── UserProfile.tsx
│   ├── AuthGuard.tsx
│   └── SessionManager.tsx # Session persistence management
├── roles/
│   ├── RoleGuard.tsx      # Role-based access control
│   ├── PermissionCheck.tsx # Permission validation
│   ├── RoleSelector.tsx   # Role selection interface
│   └── AdminPanel.tsx     # Admin role management
├── clinical-simulation/
│   ├── SimulationInterface.tsx
│   ├── ScenarioCard.tsx
│   ├── SimulationHistory.tsx
│   └── MemoryPanel.tsx    # Simulation memory display
├── memory/
│   ├── ContextManager.tsx # Context management
│   ├── MemoryRetriever.tsx
│   ├── ContextSummary.tsx
│   └── MemoryEditor.tsx
├── notifications/
│   ├── NotificationToast.tsx
│   ├── NotificationCenter.tsx
│   ├── NotificationBell.tsx
│   └── NotificationItem.tsx
└── layout/
    ├── Header.tsx
    ├── Sidebar.tsx
    ├── Footer.tsx
    └── Navigation.tsx
```

---

## 🧠 Sistema de Memoria y Contexto

### **Características del Sistema de Memoria**

#### **1. Memoria de Consulta Médica**
- **Contexto de Consulta**: Mantiene el contexto de la consulta médica actual
- **Resúmenes Automáticos**: Genera resúmenes de consultas largas
- **Metadatos Médicos**: Almacena información relevante del paciente
- **Especialidad Médica**: Contexto específico por especialidad

#### **2. Memoria de Usuario**
- **Historial Médico**: Recuerda casos y diagnósticos previos
- **Preferencias**: Aprende de las preferencias del médico
- **Especialidad**: Contexto específico de la especialidad médica
- **Progreso**: Seguimiento del progreso en simulaciones

#### **3. Memoria de Clinical Simulation**
- **Escenarios Previos**: Recuerda escenarios ya completados
- **Dificultad Adaptativa**: Ajusta la dificultad basada en el historial
- **Casos Complejos**: Memoria de casos clínicos complejos
- **Evaluación Continua**: Seguimiento del progreso del usuario

### **Implementación Técnica**

#### **Gestión de Contexto**
```typescript
// Context management system
interface MedicalQueryContext {
  patientInfo?: PatientInfo;
  medicalHistory?: MedicalHistory;
  specialtyContext?: SpecialtyContext;
  querySummary?: string;
  importantPoints?: string[];
}

interface AgentMemory {
  userId: string;
  agentType: 'medical_query' | 'clinical_simulation';
  memoryKey: string;
  memoryData: any;
  importanceScore: number;
  lastAccessed: Date;
}
```

#### **Sistema de Embeddings**
- **Vectorización**: Convertir contexto a embeddings
- **Búsqueda Semántica**: Encontrar contexto relevante
- **Compresión**: Comprimir contexto largo
- **Priorización**: Priorizar información importante

#### **Flujo de Memoria**
1. **Entrada**: Usuario envía consulta médica
2. **Detección**: Detectar idioma del usuario
3. **Título**: Generar título automático (primer mensaje)
4. **Recuperación**: Buscar contexto relevante
5. **Procesamiento**: Combinar contexto con entrada
6. **Respuesta**: Generar respuesta en idioma del usuario
7. **Almacenamiento**: Guardar nuevo contexto
8. **Notificación**: Mostrar notificación de éxito/error

---

## 🏷️ Sistema de Títulos Automáticos y Detección de Idioma

### **Generación Automática de Títulos**

#### **Proceso de Generación**
1. **Primer Mensaje**: Analizar la primera consulta médica del usuario
2. **IA Processing**: Usar Gemini para generar título descriptivo
3. **Ejemplos de Títulos**:
   - "¿Qué es diabetes?" → "Definición de diabetes"
   - "Síntomas de hipertensión" → "Síntomas de hipertensión arterial"
   - "Caso clínico: paciente con dolor torácico" → "Caso clínico: dolor torácico"
   - "Differential diagnosis for fever" → "Differential diagnosis for fever"

#### **Implementación Técnica**
```typescript
interface MedicalQueryTitle {
  originalQuery: string;
  generatedTitle: string;
  language: string;
  confidence: number;
}

// Title generation prompt
const medicalQueryTitlePrompt = `
Generate a concise, descriptive title (max 60 characters) for this medical query.
Language: {detected_language}
Query: {user_query}
Title:`;
```

### **Detección de Idioma**

#### **Sistema de Detección**
- **Auto-detección**: Detectar idioma del primer mensaje
- **Configuración Manual**: Permitir cambio de idioma
- **Soporte Multiidioma**: Español, Inglés, Francés, Alemán, Portugués
- **Respuesta Adaptativa**: Agente responde en el idioma detectado

#### **Implementación**
```typescript
interface LanguageDetection {
  detectedLanguage: string;
  confidence: number;
  supportedLanguages: string[];
}

// Language detection using Google AI
const detectLanguage = async (text: string): Promise<LanguageDetection> => {
  // Use Gemini to detect language
  // Return language code and confidence
};
```

---

## 🔔 Sistema de Notificaciones

### **Tipos de Notificaciones**

#### **1. Notificaciones de Éxito**
- ✅ Consulta médica creada exitosamente
- ✅ Simulación clínica iniciada
- ✅ Archivo subido correctamente
- ✅ Configuración guardada

#### **2. Notificaciones de Error**
- ❌ Error de autenticación
- ❌ Error de conexión
- ❌ Error al eliminar consulta médica
- ❌ Error al procesar audio/imagen

#### **3. Notificaciones de Advertencia**
- ⚠️ Límite de consultas alcanzado
- ⚠️ Suscripción próxima a vencer
- ⚠️ Problemas de conectividad

#### **4. Notificaciones Informativas**
- ℹ️ Nueva funcionalidad disponible
- ℹ️ Actualización del sistema
- ℹ️ Recordatorio de uso
- ℹ️ Nuevos casos clínicos disponibles

### **Implementación de Notificaciones**

#### **Componente Toast**
```typescript
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  actionUrl?: string;
  duration?: number;
}

// Toast notification component
const NotificationToast = ({ notification }: { notification: Notification }) => {
  // Auto-dismiss after duration
  // Different styles per type
  // Action button if actionUrl provided
};
```

#### **Centro de Notificaciones**
- **Bell Icon**: Mostrar número de notificaciones no leídas
- **Dropdown**: Lista de notificaciones recientes
- **Mark as Read**: Marcar como leída
- **Clear All**: Limpiar todas las notificaciones

#### **Notificaciones Persistentes**
- **Base de Datos**: Almacenar notificaciones en Supabase
- **Sincronización**: Sincronizar entre dispositivos
- **Historial**: Mantener historial de notificaciones

---

## 🔐 Autenticación OAuth Exclusiva

### **Configuración de OAuth**

#### **Proveedores Soportados**
- **Google OAuth**: Autenticación con cuenta de Google
- **Microsoft OAuth**: Autenticación con cuenta de Microsoft (Azure AD)
- **Sin Email/Password**: No se requiere registro manual

#### **Flujo de Autenticación**
1. **Usuario hace clic** en "Iniciar sesión con Google" o "Iniciar sesión con Microsoft"
2. **Redirección** al proveedor OAuth
3. **Autorización** del usuario en el proveedor
4. **Callback** con tokens de acceso y refresh token
5. **Creación/Actualización** del perfil en Supabase
6. **Almacenamiento seguro** de tokens en localStorage/sessionStorage
7. **Redirección** al dashboard
8. **Persistencia automática** de sesión en recargas

#### **Implementación Técnica**
```typescript
// OAuth configuration
interface OAuthConfig {
  google: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
  microsoft: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
}

// Session management
interface SessionData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Session storage utilities
const sessionStorage = {
  setSession: (session: SessionData) => {
    localStorage.setItem('xynaps_session', JSON.stringify(session));
  },
  getSession: (): SessionData | null => {
    const session = localStorage.getItem('xynaps_session');
    return session ? JSON.parse(session) : null;
  },
  clearSession: () => {
    localStorage.removeItem('xynaps_session');
  },
  isSessionValid: (session: SessionData): boolean => {
    return Date.now() < session.expiresAt;
  }
};

// Auto-login hook
const useAutoLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = sessionStorage.getSession();
    if (session && sessionStorage.isSessionValid(session)) {
      // Auto-login with valid session
      setUser(session.user);
    }
    setIsLoading(false);
  }, []);

  return { user, isLoading };
};

// OAuth login component
const OAuthLogin = () => {
  return (
    <div className="flex flex-col gap-4">
      <button onClick={handleGoogleLogin}>
        <img src="/google-icon.svg" alt="Google" />
        Continuar con Google
      </button>
      <button onClick={handleMicrosoftLogin}>
        <img src="/microsoft-icon.svg" alt="Microsoft" />
        Continuar con Microsoft
      </button>
    </div>
  );
};
```

---

## 🎨 Configuración del Logo

### **Logo de la Aplicación**
- **Archivo**: `xynaps_logo.png`
- **Ubicación**: `/public/xynaps_logo.png`
- **Uso**: Header, login page, favicon, emails
- **Optimización**: WebP format para mejor rendimiento

### **Implementación del Logo**
```typescript
// Logo component
const AppLogo = ({ className, size = 'default' }: AppLogoProps) => {
  return (
    <Image
      src="/xynaps_logo.png"
      alt="Xynaps - Medical AI Assistant"
      width={size === 'small' ? 32 : size === 'large' ? 120 : 64}
      height={size === 'small' ? 32 : size === 'large' ? 120 : 64}
      className={className}
      priority
    />
  );
};
```

### **Ubicaciones del Logo**
- **Header**: Logo principal en la navegación
- **Login Page**: Logo centrado en página de autenticación
- **Favicon**: Versión pequeña para pestaña del navegador
- **Emails**: Logo en plantillas de email
- **Documentación**: Logo en documentación y marketing

---

## 🔐 Sistema de Persistencia de Sesión

### **Características del Sistema de Sesión**

#### **1. Persistencia Automática**
- **Auto-login**: Sesión se mantiene al recargar la página
- **Cierre de Ventana**: Sesión persiste al cerrar y abrir el navegador
- **Refresh Tokens**: Renovación automática de tokens de acceso
- **Validación de Sesión**: Verificación continua de validez de tokens

#### **2. Almacenamiento Seguro**
- **localStorage**: Almacenamiento persistente de sesión
- **Encriptación**: Tokens encriptados en el cliente
- **Expiración**: Control automático de expiración de tokens
- **Limpieza**: Eliminación automática de sesiones expiradas

#### **3. Gestión de Tokens**
- **Access Token**: Token de acceso para API calls
- **Refresh Token**: Token para renovar access token
- **Expiración**: Control de tiempo de vida de tokens
- **Renovación**: Renovación automática antes de expirar

### **Implementación Técnica**

#### **Middleware de Sesión**
```typescript
// Session middleware for Next.js
export function withSession(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSessionFromRequest(req);
    
    if (!session || !isSessionValid(session)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Add session to request context
    req.session = session;
    return handler(req, res);
  };
}

// Client-side session hook
const useSession = () => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      const storedSession = sessionStorage.getSession();
      
      if (storedSession && sessionStorage.isSessionValid(storedSession)) {
        setSession(storedSession);
      } else if (storedSession) {
        // Try to refresh the session
        const refreshedSession = await refreshSession(storedSession.refreshToken);
        if (refreshedSession) {
          sessionStorage.setSession(refreshedSession);
          setSession(refreshedSession);
        } else {
          sessionStorage.clearSession();
        }
      }
      
      setIsLoading(false);
    };

    initializeSession();
  }, []);

  return { session, isLoading };
};
```

#### **Refresh Token System**
```typescript
// Token refresh utility
const refreshSession = async (refreshToken: string): Promise<SessionData | null> => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (response.ok) {
      const newSession = await response.json();
      return newSession;
    }
    
    return null;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return null;
  }
};

// Auto-refresh before expiration
const setupAutoRefresh = (session: SessionData) => {
  const timeUntilExpiry = session.expiresAt - Date.now();
  const refreshTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 0); // 5 minutes before expiry

  setTimeout(async () => {
    const newSession = await refreshSession(session.refreshToken);
    if (newSession) {
      sessionStorage.setSession(newSession);
      setupAutoRefresh(newSession); // Setup next refresh
    }
  }, refreshTime);
};
```

#### **Session Security**
- **HTTPS Only**: Tokens solo se transmiten por HTTPS
- **HttpOnly Cookies**: Para tokens sensibles (opcional)
- **CSRF Protection**: Protección contra ataques CSRF
- **Token Rotation**: Rotación regular de refresh tokens

---

## 👥 Sistema de Roles y Permisos

### **Roles Predefinidos**

#### **1. Admin** 🛡️
- **Descripción**: Administrador del sistema
- **Permisos**: Acceso completo a todas las funcionalidades
- **Características**:
  - Gestión de usuarios y roles
  - Configuración del sistema
  - Acceso a logs y analytics
  - Gestión de suscripciones
  - Moderación de contenido
  - Acceso completo a todas las consultas y simulaciones

#### **2. User** 👤
- **Descripción**: Usuario básico (gratuito)
- **Permisos**: Acceso limitado a funcionalidades básicas
- **Características**:
  - Medical Query (límite: 5 por mes)
  - Clinical Simulation básicas (límite: 2 por mes)
  - Historial de consultas médicas propias
  - Acceso a casos básicos
  - Sin exportación de datos
  - Sin acceso a analytics

#### **3. Subscriber** 💎
- **Descripción**: Usuario con suscripción activa
- **Permisos**: Acceso completo a Medical Query y Clinical Simulation
- **Características**:
  - Medical Query ilimitadas
  - Clinical Simulation avanzadas
  - Historial completo de consultas médicas
  - Acceso a casos complejos
  - Generación de reportes
  - Exportación de datos
  - Acceso a analytics personales

### **Sistema de Permisos**

#### **Permisos Granulares**
```typescript
interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;
}

// Permission examples
const permissions = {
  // Medical Query permissions
  'medical_query:create': 'Create new medical queries',
  'medical_query:read': 'Read query history',
  'medical_query:delete': 'Delete medical queries',
  'medical_query:export': 'Export query data',
  'medical_query:unlimited': 'Unlimited medical query access',
  
  // Clinical Simulation permissions
  'clinical_simulation:create': 'Create clinical simulations',
  'clinical_simulation:read': 'Access simulations',
  'clinical_simulation:basic': 'Access basic simulations',
  'clinical_simulation:advanced': 'Access advanced cases',
  'clinical_simulation:unlimited': 'Unlimited simulation access',
  
  // User management
  'users:read': 'View user profiles',
  'users:manage': 'Manage user accounts',
  'roles:assign': 'Assign roles to users',
  
  // System administration
  'system:configure': 'Configure system settings',
  'system:logs': 'Access system logs',
  'analytics:view': 'View analytics data',
  'analytics:personal': 'View personal analytics'
};
```

#### **Middleware de Autorización**
```typescript
// Role-based authorization middleware
export function withRole(requiredRole: string, requiredPermissions?: string[]) {
  return function(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const user = req.session?.user;
      
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      // Check role
      if (user.role !== requiredRole && user.role !== 'admin') {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
      
      // Check specific permissions
      if (requiredPermissions) {
        const hasPermission = requiredPermissions.every(permission => 
          user.permissions.includes(permission)
        );
        
        if (!hasPermission) {
          return res.status(403).json({ error: 'Insufficient permissions' });
        }
      }
      
      return handler(req, res);
    };
  };
}

// Component-level permission check
const PermissionCheck = ({ 
  permission, 
  children, 
  fallback = null 
}: PermissionCheckProps) => {
  const { user } = useSession();
  
  if (!user || !user.permissions.includes(permission)) {
    return fallback;
  }
  
  return <>{children}</>;
};
```

### **Implementación de Roles**

#### **Asignación de Roles**
- **Automática**: Usuarios nuevos se asignan como 'user' por defecto
- **Manual**: Administradores pueden cambiar roles
- **Upgrade**: Usuarios se convierten en 'subscriber' al activar suscripción
- **Downgrade**: Usuarios vuelven a 'user' al cancelar suscripción

#### **Validación de Permisos**
- **Frontend**: Validación en componentes y rutas
- **Backend**: Middleware de autorización en API routes
- **Base de Datos**: Validación a nivel de consultas
- **UI**: Interfaz adaptativa según permisos

#### **Gestión de Roles**
- **Panel de Administración**: Interfaz para gestionar roles (solo admin)
- **Auditoría**: Log de cambios de roles
- **Notificaciones**: Alertas de cambios de permisos
- **Historial**: Seguimiento de roles asignados
- **Sincronización**: Roles se sincronizan con estado de suscripción

---

## 🏠 Página Informativa Principal

### **Estructura de la Landing Page**

#### **1. Hero Section** 🎯
- **Título principal**: "Xynaps - IA Médica Inteligente"
- **Subtítulo**: "Consulta médica y simulaciones clínicas con IA avanzada"
- **Call-to-Action**: Botones de login OAuth (Google y Microsoft)
- **Logo prominente**: xynaps_logo.png centrado
- **Background**: Diseño médico profesional

#### **2. Features Section** ✨
- **Medical Query**: IA especializada en medicina
- **Clinical Simulation**: Entrenamiento interactivo
- **Memoria Inteligente**: Contexto persistente entre sesiones
- **Multiidioma**: Soporte para español, inglés, francés, alemán, portugués
- **Streaming en Tiempo Real**: Respuestas inmediatas
- **Seguridad Médica**: Cumplimiento HIPAA

#### **3. Pricing Section** 💰
- **Free Trial**: 7 días gratis (5 consultas, 2 simulaciones)
- **Basic Plan**: $10/mes (50 consultas, 10 simulaciones)
- **Premium Plan**: $50/mes (ilimitado + características avanzadas)
- **Comparación visual** de características por plan

#### **4. About Section** 📋
- **Misión**: "Revolucionar la consulta médica con IA"
- **Visión**: "Democratizar el acceso a conocimiento médico"
- **Tecnología**: Gemini 2.5 Pro, Supabase, Next.js 15
- **Equipo**: Información sobre el equipo médico y técnico

#### **5. Contact Section** 📞
- **Email**: contacto@xynaps.com
- **Soporte**: soporte@xynaps.com
- **Redes sociales**: LinkedIn, Twitter
- **Formulario de contacto** opcional

### **Integración del Login**

#### **Login Modal** 🔐
```typescript
// Login modal component
const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión en Xynaps</DialogTitle>
          <DialogDescription>
            Accede a tu cuenta para continuar
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <OAuthLogin />
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

#### **Hero Section con Login** 🎯
```typescript
// Hero section with integrated login
const HeroSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 text-center">
        <AppLogo size="large" className="mx-auto mb-8" />
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Xynaps
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          IA médica inteligente para consultas y simulaciones clínicas
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
          
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50">
            Ver Demo
          </button>
        </div>
        
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </div>
    </section>
  );
};
```

### **Navegación y Footer**

#### **Header Navigation** 🧭
- **Logo**: Xynaps logo pequeño
- **Menú**: Características, Precios, Acerca de, Contacto
- **Login Button**: Botón prominente para iniciar sesión
- **Responsive**: Menú hamburguesa en móviles

#### **Footer** 📄
- **Enlaces**: Términos, Privacidad, Soporte
- **Redes sociales**: Iconos de redes
- **Copyright**: "© 2024 Xynaps. Todos los derechos reservados"
- **Logo**: Logo pequeño en el footer

### **Responsive Design**

#### **Mobile First** 📱
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navegación móvil**: Menú hamburguesa
- **Login móvil**: Modal optimizado para pantallas pequeñas
- **Imágenes**: Optimizadas para diferentes tamaños

#### **Performance** ⚡
- **Lazy Loading**: Imágenes y componentes
- **Optimización**: WebP format para imágenes
- **SEO**: Meta tags optimizados
- **Accesibilidad**: WCAG 2.1 AA compliance

---

## 💰 Planes de Suscripción

| Plan | Precio | Características |
|------|--------|----------------|
| **Free Trial** | $0 (7 días) | 5 consultas, 2 simulaciones |
| **Basic** | $10/mes | 50 consultas, 10 simulaciones |
| **Premium** | $50/mes | Ilimitado + características avanzadas |

### **Límites por Plan**
- **Free Trial**: 5 consultas médicas, 2 simulaciones clínicas
- **Basic**: 50 consultas médicas, 10 simulaciones clínicas
- **Premium**: Consultas y simulaciones ilimitadas

---

## 🚀 Próximos Pasos Inmediatos

### **Semana 1 - Configuración Base**
1. **Configurar Supabase**
   - Crear proyecto en Supabase
   - Configurar autenticación OAuth exclusivamente
   - Crear tablas de base de datos
   - **Configurar tablas de memoria y contexto**

2. **Instalar shadcn/ui**
   - Configurar componentes base
   - Crear tema personalizado
   - **Implementar página informativa principal**
   - **Configurar logo de la aplicación**

3. **Configurar Gemini AI**
   - Configurar API keys
   - Crear clientes para desarrollo y producción
   - Implementar streaming básico
   - **Configurar sistema de memoria y contexto**

4. **Estructura de Carpetas**
   - Crear estructura según arquitectura
   - Configurar aliases de TypeScript
   - **Implementar landing page con login integrado**
   - **Crear carpetas para sistema de memoria**
   - **Agregar logo a assets públicos**

---

## 🔧 Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Backend**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth + OAuth exclusivamente
- **IA**: Google Gemini 2.5 Pro/Flash Lite
- **Pagos**: PayPal
- **Deployment**: Vercel (recomendado)
- **Memoria**: Sistema de contexto persistente con embeddings
- **Streaming**: Respuestas en tiempo real con memoria
- **Idiomas**: Detección automática y respuesta multiidioma
- **Notificaciones**: Sistema de toast y centro de notificaciones
- **Branding**: Logo personalizado (xynaps_logo.png)
- **Sesión**: Persistencia automática con refresh tokens
- **Autorización**: Sistema de roles y permisos granular

---

## 📝 Notas de Desarrollo

- **Arquitectura Limpia**: Separación clara de responsabilidades
- **Comentarios**: Código documentado en inglés
- **TypeScript**: Tipado estricto en todo el proyecto
- **Testing**: Implementar tests unitarios y de integración
- **SEO**: Meta tags y optimización para motores de búsqueda
- **Accesibilidad**: WCAG 2.1 AA compliance
- **Memoria y Contexto**: Sistema robusto de memoria persistente
- **Privacidad Médica**: Cumplimiento HIPAA para datos médicos

---

## 🎯 Objetivos de Calidad

- **Performance**: Lighthouse score > 90
- **Accesibilidad**: WCAG 2.1 AA
- **SEO**: Meta tags optimizados
- **Security**: OWASP Top 10 compliance
- **Testing**: > 80% coverage
- **Documentation**: README completo y comentarios en código
- **Memoria**: Contexto persistente entre sesiones
- **Precisión Médica**: Validación de respuestas médicas

---

*Última actualización: [Fecha actual]*
*Versión del plan: 1.0*
