import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrentUser from "../actions/getCurrentUser"
import { getFavoriteListings } from "../actions/getFavoriteListings";
import FavoriteClient from "./FavoritesClient";


const FavoritePage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }


    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No favorites found"
                    subtitle="Looks like you've no favorite listings"
                />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <FavoriteClient 
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default FavoritePage