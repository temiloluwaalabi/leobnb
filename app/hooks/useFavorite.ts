import axios from "axios";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";

import useLoginModal from "./useLoginModel";

interface IuseFavorite{
    listingId: string;
    parentUser?: SafeUser | null
}

const useFavorite = ({
    listingId,
    parentUser
}: IuseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list  = parentUser?.favoriteIds || [];
        return list.includes(listingId)
    }, [parentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!parentUser){
            return loginModal.onOpen();
        }

        try {
            let request;

            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }else{
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request();
            router.refresh();
            toast.success("Success")
        } catch (error) {
            toast.error('Something went wrong')
        }
    }, [parentUser, hasFavorited, listingId, loginModal, router])

    return{
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;