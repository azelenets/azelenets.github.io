import type { ComponentType } from 'react';

type RouteModule = {
  default: ComponentType<any>;
};

type RouteLoader = () => Promise<RouteModule>;

const routeModuleLoaders = {
  '/mission': () => import('@/pages/MissionLog'),
  '/arsenal': () => import('@/pages/Arsenal'),
  '/lab': () => import('@/pages/Laboratory'),
  '/protocols': () => import('@/pages/Protocols'),
  '/credentials': () => import('@/pages/Credentials'),
  '/distributed-nodes': () => import('@/pages/DistributedNodes'),
  '/cloud-native': () => import('@/pages/CloudNative'),
  '/tactical-ui': () => import('@/pages/TacticalUI'),
  '/data-forge': () => import('@/pages/DataForge'),
  '/blog': () => import('@/pages/Blog'),
  '/blog/why-microservices-are-still-a-monolith': () => import('@/pages/Blog/articles/MonolithInDisguise'),
  '/blog/outbox-pattern-guaranteed-event-publishing': () => import('@/pages/Blog/articles/OutboxPattern'),
  '/blog/gitops-is-not-just-argo-it-is-a-culture-shift': () => import('@/pages/Blog/articles/GitOpsCultureShift'),
  '/blog/kubernetes-resource-requests-vs-limits': () => import('@/pages/Blog/articles/K8sResourceLimits'),
  '/blog/rethinking-component-state-finite-state-machines-react': () => import('@/pages/Blog/articles/FiniteStateMachinesReact'),
  '/blog/core-web-vitals-inp-is-the-new-lcp': () => import('@/pages/Blog/articles/CoreWebVitalsINP'),
  '/blog/kafka-consumer-lag-is-a-symptom-not-the-disease': () => import('@/pages/Blog/articles/KafkaConsumerLag'),
  '/blog/exactly-once-semantics-what-it-actually-means': () => import('@/pages/Blog/articles/ExactlyOnceSemantics'),
  '/blog/on-call-rota-is-a-design-problem-not-a-people-problem': () => import('@/pages/Blog/articles/OnCallDesignProblem'),
  '/blog/the-senior-engineers-guide-to-saying-no': () => import('@/pages/Blog/articles/SeniorEngineerSayingNo'),
  '/blog/top-database-performance-killers': () => import('@/pages/Blog/articles/DbPerformanceKillers'),
  '*': () => import('@/pages/NotFound'),
} as const satisfies Record<string, RouteLoader>;

type PreloadableRoute = keyof typeof routeModuleLoaders;

const routeModuleCache = new Map<PreloadableRoute, Promise<RouteModule>>();

const loadRouteModule = (path: PreloadableRoute) => {
  const cached = routeModuleCache.get(path);
  if (cached) {
    return cached;
  }

  const promise = routeModuleLoaders[path]();
  routeModuleCache.set(path, promise);
  return promise;
};

export const loadKnownRouteModule = (path: PreloadableRoute) => loadRouteModule(path);

export const preloadRouteModule = (path: string) => {
  if (!(path in routeModuleLoaders)) {
    return null;
  }

  return loadRouteModule(path as PreloadableRoute);
};
