import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadVideoComponent} from "./upload-video/upload-video.component";
import {SaveVideoDetailsComponent} from "./save-video-details/save-video-details.component";
import {VideoDetailComponent} from './video-detail/video-detail.component';
import {HomeComponent} from "./home/home.component";
import {SubscriptionsComponent} from "./subscriptions/subscriptions.component";
import {HistoryComponent} from "./history/history.component";
import {LikedVideosComponent} from "./liked-videos/liked-videos.component";
import {FeaturedComponent} from "./featured/featured.component";
import {CallbackComponent} from "./callback/callback.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {ChannelComponent} from "./channel/channel.component";
import {TrendingComponent} from "./trending/trending.component";
import {PlaylistListComponent} from "./playlist-list/playlist-list.component";
import {PlaylistComponent} from "./playlist/playlist.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'featured', component: FeaturedComponent },
            { path: 'subscriptions', component: SubscriptionsComponent },
            { path: 'history', component: HistoryComponent },
            { path: 'liked-videos', component: LikedVideosComponent },
            { path: 'trending', component: TrendingComponent },
            { path: 'playlists', component: PlaylistListComponent },
            { path: '', redirectTo: 'featured', pathMatch: 'full' }
        ]
    },

    { path: 'search', component: SearchResultsComponent },
    { path: 'channel/:userId', component: ChannelComponent },
    { path: 'playlist/:playlistId', component: PlaylistComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'upload-video', component: UploadVideoComponent },
    { path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent },
    { path: 'video-details/:videoId', component: VideoDetailComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
