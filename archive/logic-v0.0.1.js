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

/** v0.0.1
 *  Initial version of art-ledger logic.
 */

/**
 * Track the sale of an art work from one owner to another
 * @param {org.artledger.SellArtWork} sellArtWork
 * @transaction
 */
async function sellArtWork(sellArtWork) {
    sellArtWork.artWork.owner = sellArtWork.newOwner;
    let assetRegistry = await getAssetRegistry('org.artledger.ArtWork');
    await assetRegistry.update(sellArtWork.artWork);
}
