# Changelog — Refactor Técnico (Mayo 2026)

Resumen de todos los cambios realizados en la sesión de refactorización técnica del backend NexoAI API.

---

## 🔴 Críticos — Correcciones de Base de Datos y Tipos

### 1. Migraciones (reemplazo de `synchronize: true`)
- **`src/data-source.ts`** — Nuevo archivo config standalone para TypeORM CLI
- **`src/migrations/`** — Nuevo directorio para migraciones
- **`app.module.ts`** — Migrado de `TypeOrmModule.forRoot()` a `forRootAsync()` con `ConfigService`
- **`synchronize: false`** — Deshabilitado en producción
- **`package.json`** — Nuevos scripts: `typeorm`, `migration:generate`, `migration:run`, `migration:revert`, `migration:show`
- **`src/migrations/1700000000000-SeedInitialData.ts`** — Seed de planes de suscripción y métodos de pago

### 2. Product-Category FK: `category_name` → `category_id`
- **`product.entity.ts`** — Eliminado `@JoinColumn({ name: 'category_name' })`, agregado `category_id: number` + `@JoinColumn({ name: 'category_id' })`
- **`create-product.dto.ts`** — `category: string` → `category_id: number`
- **`products.service.ts`** — Busca categoría por `id` no por `category_name`

### 3. Corrección de Tipos en Entidades (OneToOne / ManyToOne)
- **`sale.entity.ts`** — Eliminado `product JSONB`, `payment: Payment` (relación)
- **`payment.entity.ts`** — `sale_id: number` (columna) + `sale: Sale` (relación), `point_sale_id` consistente
- **`sales-detail.entity.ts`** — `sale_id: number` + `sale: Sale` (antes era `sale: number`)
- **`payments-detail.entity.ts`** — `payment_id: number` + `payment: Payment` (antes era `payment: number`)

### 4. Relaciones OneToMany tipadas como arreglos
- **`company.entity.ts`** — `users: Users[]`, `point_sales: PointSale[]`, `work_sessions: WorkSession[]`
- **`user.entity.ts`** — `work_sessions: WorkSession[]`
- **`category.entity.ts`** — `products: Product[]`
- **`point-sale.entity.ts`** — `sales: Sale[]`

### 5. Timestamps: `string` → `Date`
- **`user.entity.ts`** — `@CreateDateColumn` + `@UpdateDateColumn`
- **`company.entity.ts`** — `@CreateDateColumn` + `@UpdateDateColumn`
- **`work-session.entity.ts`** — `check_in: Date`, `check_out: Date | null`

### 6. `phone_number`: `number` → `string`
- **`user.entity.ts`**, **`company.entity.ts`** — Tipo cambiado
- **`create-user.dto.ts`** — `@Matches(/^[+\d][\d\s-]+$/)` para validación
- **`create-auth.dto.ts`** — Misma validación

### 7. JWT `signOptions` corregido
- **`jwt.config.ts`** — `parseInt('1h')` → `{ expiresIn: '1h' }`, renombrado a `jwtConfig`
- **`common.module.ts`**, **`auth.module.ts`**, **`users.module.ts`**, **`sales.module.ts`**, **`chat.module.ts`** — Actualizados
- **`auth.guard.ts`** — Import actualizado

### 8. `bcrypt` → `bcryptjs`
- **`hash.util.ts`** — Import cambiado + `@Injectable()` agregado
- **`package.json`** — `bcrypt` eliminado

### 9. Subscription FK a Company
- **`suscription.entity.ts`** — Relación `@ManyToOne(() => Company)` descomentada

---

## 🟡 Altos — Seguridad y Configuración

### 10. CORS
- **`main.ts`** — `app.enableCors()` con `CORS_ORIGINS` desde env

### 11. Rate Limiting
- **`app.module.ts`** — `ThrottlerModule.forRoot()` con 60 req/min
- Instalado `@nestjs/throttler`

### 12. TenantGuard
- **`tenant.guard.ts`** — Nuevo guard para aislamiento multi-tenant por `company_id`

### 13. Logout + Refresh Token Validation
- **`auth.controller.ts`** — Nuevo endpoint `POST /auth/logout`
- **`auth.service.ts`** — `logout()` invalida refresh token; `refreshToken()` verifica expiración local
- **`update-auth.dto.ts`** — Typo `refresh_tocken` → `refresh_token`

### 14. GenerateInsightsJob fix
- **`generate-insights.job.ts`** — Usa `INNER JOIN point_sale` para resolver `company_id`

### 15. HashUtil como Provider DI
- **`hash.util.ts`** — `@Injectable()`, inyectado en `AuthService` en vez de `new HashUtil()`

---

## 🟢 Medios — Limpieza y Mejoras

### 16. Redundancia JSONB eliminada
- **`sale.entity.ts`** — Eliminado `product JSONB`
- **`payment.entity.ts`** — Eliminado `paymentDetail JSONB`
- **`sales.service.ts`** — Flujo ajustado para usar solo relaciones

### 17. WorkSession: `total_time` calculado
- **`work-sessions.service.ts`** — `checkOut()` calcula diferencia en minutos entre check_in y check_out

### 18. pgvector: `float[]` → `vector(768)`
- **`conversation-embedding.entity.ts`** — `@Column('vector', { length: 768 })`
- **`embeddings.service.ts`** — Usa `<=>` operator con cast `::vector`

### 19. PaymentsMethod FK
- **`payments-detail.entity.ts`** — `payment_method_id: number` + FK a `PaymentsMethod`
- **`create-payments-detail.dto.ts`** — `payment_method: string` → `payment_method_id: number`
- **`payments-method.entity.ts`** — `@Column({ unique: true })`

### 20. Seed Data
- **`src/migrations/1700000000000-SeedInitialData.ts`** — Inserta planes Starter/Professional/Enterprise y métodos de pago

---

## 🔵 Bajos — DX y Documentación

### 21. Swagger/OpenAPI
- **`main.ts`** — Configurado `SwaggerModule` en `/api/docs`
- Instalado `@nestjs/swagger`

### 22. Logger en vez de console.log
- **`auth.service.ts`**, **`companies.service.ts`**, **`users.service.ts`**, **`sales.service.ts`** — Reemplazados

### 23. `.env.example`
- Nuevo archivo con valores placeholder para todas las variables

### 24. `create-user.dto.ts` limpiado
- Eliminados campos `created_at`/`updated_at` (son auto-manejados por TypeORM)

---

## Archivos Nuevos

| Archivo | Propósito |
|---------|-----------|
| `src/data-source.ts` | Config standalone para CLI de migraciones |
| `src/migrations/1700000000000-SeedInitialData.ts` | Seed de datos iniciales |
| `src/common/guard/tenant.guard.ts` | Guard de aislamiento multi-tenant |
| `.env.example` | Template de variables de entorno |
| `CHANGELOG-REFACTOR.md` | Este documento |

## Dependencias Instaladas

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `pgvector` | ^0.3.0 | Soporte pgvector para TypeORM |
| `@nestjs/throttler` | ^6.x | Rate limiting |
| `@nestjs/swagger` | ^11.x | Documentación OpenAPI |

## Dependencias Eliminadas

| Paquete | Motivo |
|---------|--------|
| `bcrypt` | Reemplazado por `bcryptjs` (ya estaba como alternativa) |
