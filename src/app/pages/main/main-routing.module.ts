import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users-growth',
        loadChildren: () => import('../users-growth/users-growth.module').then(m => m.UsersGrowthModule)
      },
      {
        path: 'moods-growth',
        loadChildren: () => import('../moods-growth/moods-growth.module').then(m => m.MoodsGrowthModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('../articles/articles.module').then(m => m.ArticlesModule)
      },
      {
        path: 'themes',
        loadChildren: () => import('../themes/themes.module').then(m => m.ThemesModule)
      },
      {
        path: 'feedbacks-chatbot',
        loadChildren: () => import('../feedbacks-chatbot/feedbacks-chatbot.module').then(m => m.FeedbacksChatbotModule)
      },
      {
        path: 'feedbacks-app',
        loadChildren: () => import('../feedbacks-app/feedbacks-app.module').then(m => m.FeedbacksAppModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
