import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users-growth'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
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
        path: 'app-feedbacks',
        loadChildren: () => import('../app-feedbacks/app-feedbacks.module').then(m => m.AppFeedbacksModule)
      },
      {
        path: 'chatbot-feedbacks',
        loadChildren: () => import('../chatbot-feedbacks/chatbot-feedbacks.module').then(m => m.ChatbotFeedbacksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
