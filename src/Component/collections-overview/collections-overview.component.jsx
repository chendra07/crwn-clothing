import React from "react";

//redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {selectCollectionForPreview} from "../../redux/shop/shop.selectors";

//component
import CollectionPreview from "../collection-preview/collection-preview.component";

//styling
import "./collections-overview.styles.scss";

const CollectionOverview = ({collections}) => (
    <div className="collection-overview">
        {collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionOverview);