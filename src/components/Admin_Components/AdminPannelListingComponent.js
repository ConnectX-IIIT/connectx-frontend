import React from 'react'
import "../../styles/Admin/AdminPannelListingComponent.css"

const ListingItemComponent = () =>{
  return(
      <div className="admin-pannel-listing-individual-wrapper">
          hello
      </div>
  )


}

const AdminPannelListingComponent = () => {
    return (
        <div className="admin-pannel-listing-wrapper scrollbarHidden ">
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
            <ListingItemComponent/>
        </div>
    )
}

export default AdminPannelListingComponent
