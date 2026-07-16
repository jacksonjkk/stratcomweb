# TODO

## Fix Firebase Hosting init crash
- [ ] Identify root cause (Firebase CLI JSON parse error)
- [x] Repair corrupted `package.json` (invalid JSON around `jspdf`)
- [ ] (Optional) clean install artifacts (`node_modules`, `yarn.lock`) if needed
- [ ] Re-run `firebase init hosting --debug` to confirm it completes
- [ ] Generate `firebase.json` + `.firebaserc` if it succeeds
- [ ] Build and serve (verify `vite build` output and hosting configuration)

