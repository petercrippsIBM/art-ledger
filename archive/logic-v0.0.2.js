/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/** v0.0.1: Initial version of art-ledger logic.
 *  v0.0.2: Add auction functionality.
 */

/**
 * Track the sale of an art work from one owner to another.
 * If sold then art work can no longer be under auction so
 * set to 'false'. Finally set the value the art work was sold for.
 * @param {org.artledger.SellArtWork} sellArtWork
 * @transaction
 */
async function sellArtWork(sellArtWork) {
    sellArtWork.artWork.owner = sellArtWork.newOwner;
  	sellArtWork.artWork.underAuction = false;
  	sellArtWork.artWork.currentValue = sellArtWork.newValue;
    let assetRegistry = await getAssetRegistry('org.artledger.ArtWork');
    await assetRegistry.update(sellArtWork.artWork);
}

/**
 * Put an art work under auction (if it's not already).
 * @param {org.artledger.AuctionArtWork} auctionArtWork
 * @transaction
 */
async function auctionArtWork(auctionArtWork) {
  	if (auctionArtWork.artWork.underAuction) {
      throw new Error ("Already under auction");
    }
    auctionArtWork.artWork.underAuction = true;
    let assetRegistry = await getAssetRegistry('org.artledger.ArtWork');
    await assetRegistry.update(auctionArtWork.artWork);
}

/**
 * Place a new bid for an art work (if it's under auction).
 * Record the value of the bid in the current value field.
 * @param {org.artledger.BidOnArtWork} bidOnArtWork
 * @transaction
 */
async function bidOnArtWork(bidOnArtWork) {
  	if (!bidOnArtWork.artWork.underAuction) {
      throw new Error ("Cannot bid, not under auction");
    }
    bidOnArtWork.artWork.currentValue = bidOnArtWork.bidValue;
    let assetRegistry = await getAssetRegistry('org.artledger.ArtWork');
    await assetRegistry.update(bidOnArtWork.artWork);
}
