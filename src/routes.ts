import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { EmotionSelect } from './pages/EmotionSelect';
import { DiaryWrite } from './pages/DiaryWrite';
import { Result } from './pages/Result';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/emotion',
    Component: EmotionSelect,
  },
  {
    path: '/write',
    Component: DiaryWrite,
  },
  {
    path: '/result',
    Component: Result,
  },
]);
