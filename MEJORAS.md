# Mejoras pendientes — MisLinks Frontend

Checklist de mejoras detectadas en `mislinks-frontend`, ordenadas por prioridad. Complementa el `MEJORAS.md` de `mislinks-backend`.

## 1. Bugs funcionales

- [x] **Los errores de red no se propagan (bug crítico).** En `src/api/DevTreeAPI.ts`, todas las funciones (`getUser`, `getUserByHandle`, `updateProfile`, `uploadImage`) solo relanzaban el error cuando `isAxiosError(error) && error.response` era verdadero. Si el backend estaba caído o había un error de red/CORS (sin `error.response`), el `catch` no hacía nada y la función retornaba `undefined` silenciosamente — **nunca lanzaba**. React Query interpretaba entonces la query/mutación como exitosa con `data: undefined` y jamás disparaba `isError`. Consecuencia real: en `src/layouts/AppLayout.tsx`, si el backend no respondía, no se redirigía a `/auth/login` ni se mostraba ningún error — la pantalla quedaba en blanco. Esto es exactamente lo que pasó cuando probamos con el backend apagado. **Fix:** cada `catch` ahora hace `throw new Error("No se pudo conectar con el servidor")` cuando no hay `error.response`. Verificado con un script aislado que confirma que `axios` entrega `error.response: undefined` en un `ECONNREFUSED`.
- [x] **Mismo problema en Login/Register.** `src/views/LoginView.tsx` y `src/views/RegisterView.tsx` hacían `toast.error(error.response?.data.error)` sin fallback: si `error.response` era `undefined` (servidor caído/red), se llamaba `toast.error(undefined)`, mostrando un toast vacío o "undefined" en vez de un mensaje claro de conexión. **Fix:** ambos ahora muestran `"No se pudo conectar con el servidor"` cuando no hay `error.response`.
- [x] **La validación de URL no se re-verifica al editar un link ya activo.** En `src/views/MisLinksView.tsx`, `handleEnableLink` valida la URL con `isValidUrl` antes de activar un link, pero `handleUrlChange` no volvía a validar si el link ya estaba activo y se editaba a una URL inválida/vacía — podía quedar un link activo con URL rota que luego se publicaba tal cual en el perfil público (`src/views/HandleView.tsx`). **Fix:** se agregó `handleSave`, que antes de llamar a `mutate(user)` revisa si algún link activo tiene una URL inválida y bloquea el guardado con un `toast.error` indicando cuál, en vez de persistirlo.
- [x] **Inconsistencia de validación de password entre frontend y backend.** `RegisterView.tsx` exigía mínimo 8 caracteres; el backend (`router.ts` en `mislinks-backend`) solo exigía 6. **Fix:** se subió el mínimo de `/auth/register` a 8 caracteres en el backend para igualar al frontend. El mínimo de `/auth/login` se dejó en 6 a propósito, para no bloquear a cuentas ya registradas antes de este cambio con contraseñas de 6-7 caracteres.

## 2. Seguridad

- [ ] **JWT guardado en `localStorage`.** `src/config/axios.ts` guarda `AUTH_TOKEN` en `localStorage`, accesible por cualquier script si hubiera una vulnerabilidad XSS. Es un patrón común en SPAs simples, pero vale dejarlo documentado; la alternativa (cookie `httpOnly`) requiere cambios en el backend.
- [x] **Sin validación real de archivo antes de subir imagen.** En `src/views/Profileview.tsx` el texto decía "PNG, JPG o GIF. Máx 2MB.", pero `accept="image/*"` del `<input type="file">` es solo una sugerencia del selector del sistema operativo, no una validación — cualquier tipo/tamaño de archivo se enviaba igual al backend, que tampoco lo valida (ver ítem relacionado en el `MEJORAS.md` del backend, aún pendiente). **Fix:** `handleChangeImage` ahora rechaza el archivo antes de subirlo si `file.type` no es `image/png`, `image/jpeg` o `image/gif`, o si `file.size` supera 2MB, mostrando un `toast.error` específico en cada caso.

## 3. Calidad / arquitectura

- [ ] Activar reglas type-aware de ESLint (`tseslint.configs.recommendedTypeChecked`), como ya sugiere el propio `README.md` del proyecto pero no está aplicado en `eslint.config.js`.
- [ ] No hay un hook/componente reutilizable para "ruta protegida": `AppLayout` resuelve auth con `useQuery(["user"])` + redirect inline; si se agregan más rutas autenticadas convendría extraerlo a un hook `useAuth()`.
- [ ] No hay tests en el proyecto.
