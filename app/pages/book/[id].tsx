import { useEffect, useState } from "react";
import { auth } from "../../lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function BookDetail() {
    const [user, setUser] = useState(auth.currentUser);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user]);

    return user ? <div>Detalles del libro</div> : null;
}
