import { Routes, CanActivate  } from '@angular/router';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { HomeComponent } from './home/home.component';
import { ScoreComponent } from './score/score.component';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';

export const routes: Routes = [
	{path: '\home', component: HomeComponent},
	{path: '\puzzle', component: PuzzleComponent, canActivate: [AuthGuard]},
	{path: '\scores', component: ScoreComponent, canActivate: [AuthGuard]},
	{path: '', redirectTo: '/home', pathMatch: 'full'}
];