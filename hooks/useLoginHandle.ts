import { IUserAuth } from "@/api/auth"
import { useAuth } from "@/stores/useAuth"

function useLoginHandle() {
    const { setUser } = useAuth()

    const onLogin = (userData: IUserAuth) => {
        setUser(userData)
    }

    return onLogin
}

export default useLoginHandle