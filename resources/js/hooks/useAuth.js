import { usePage } from "@inertiajs/react"

export const useAuth = () => {
  return usePage().props.auth;
}