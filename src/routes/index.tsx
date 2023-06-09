import { ErrorBoundary } from "react-error-boundary";
import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import Layout from "../pages/layouts/Layout";
import IndexPage from "../pages/layouts/staticPages/IndexPage";
import { 
  default as ArticleIndexPage,
  loader as ArticleIndexLoader
} from "../pages/articles/Index";
import {
  default as ArticleShowPage,
  loader as ArticleShowLoader
} from "../pages/articles/Show"
import { default as ArticleNewPage } from "../pages/articles/New";
import {
  default as ProjectIndexPage,
  loader as ProjectsIndexLoader
} from "../pages/projects/Index"
import { default as ProjectNewPage } from "../pages/projects/New"
import { default as ProjectShowPage } from "../pages/projects/Show"
import {
  default as ForumsIndexPage,
  loader as ForumsIndexLoader,
} from "../pages/forums/Index"
import { default as ForumShowPage } from "../pages/forums/Show";
import { default as ForumNewPage} from "../pages/forums/New";
import { AuthenticationGuard } from "../components/Auth0s/AuthenticationGuard";
import AuthenticationGuardWithOutlet from "../components/Auth0s/AuthenticationGuardWithOutlet";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Ooooooops</div>,
    loader: (): string=>{
      console.log("rootloader");
      return 'xxx';
    },
    children: [
      {
        index: true, 
        element: <IndexPage />,
        loader: (): string =>{
          console.log("root_loader_action_hear");
          return "action_result(articles)"
        },
      },
      {
        path: "articles",
        element: <ArticleIndexPage />,
        loader: ArticleIndexLoader,
      },
      {
        path: "articles/:articleId",
        element: <ArticleShowPage />,
        // element: <AuthenticationGuard component={ArticleShowPage} />,
        loader: ArticleShowLoader,
      },
      {
        path: "articles/new",
        element: <AuthenticationGuard component={ArticleNewPage} />
      },
      {
        path: "articles/:artilceId/edit",
        element: <div>article edit</div>,
        loader: (): string =>{
          console.log("articles/:artilceId/edit_loader_action_hear");
          return "action_result(articles/:artilceId/edit)"
        },
      },
      {
        path: "articles/:artilceId/destroy",
      },
      {
        path: "projects",
        element: <ProjectIndexPage />,
        loader: ProjectsIndexLoader,
      },
      {
        path: "projects/new",
        element: <AuthenticationGuard component={ProjectNewPage} />,
      },
      {
        path: "projects/:projectId",
        element: <AuthenticationGuard component={ProjectShowPage} />,
      },
      {
        path: "forums",
        element: <ForumsIndexPage />,
        loader: ForumsIndexLoader,
      },
      {
        path: "forums/:forumId",
        element: <AuthenticationGuard component={ForumShowPage} />,
      },
      {
        path: "forums/new",
        element: <AuthenticationGuard component={ForumNewPage} />
      },
      {
       path: '',
       element: <AuthenticationGuardWithOutlet />,
        // 以下のpathではLoader/Actionは使わない（useAuth0フックを使う必要があるため、各ReactComponent内で済ます。）
       children: [
        {
          path: "myposts",
          element: <div>myposts with auth0</div>,
          loader: (): string=>{
            console.log("myposts");
            return 'xxx';
          },
        },
        {
          path: "favorites",
          element: <div>favorites<Outlet /></div>,
          loader: (): string=>{
            console.log("favoriteloader");
            return 'xxx';
          },
          children: [
            {
              index: true,
              element: <div>favorite_index</div>,
              loader: (): string=>{
                console.log("favorite_indexloader");
                return 'xxx';
              },
            },
            {
              path: "projects",
              element: <div>favorites_project</div>
            }
          ]
        },
        {
          path: "profile",
          element: <div>profile</div>,
          loader: (): string=>{
            console.log("myposts");
            return 'xxx';
          },
        },
       ]
      },
    ]
  },
]);

// TODO: ErrorBoundary かerrorelementのコンポーネント作成