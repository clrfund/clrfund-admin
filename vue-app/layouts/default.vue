<script setup>
const appStore = useAppStore()
const { showMobileMenu } = storeToRefs(appStore)
</script>

<template>
  <div>
    <Meta name="clrfund" content="A quadratic funding protocol" />
    <header
      class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-20 lg:mb-0 lg:border-0"
    >
      <AppHeader />
    </header>
    <main class="min-h-[calc(100vh-var(--header-height))]">
      <MobileMenu v-if="showMobileMenu" />
      <div class="mx-auto px-4 sm:px-6 lg:px-4 max-w-7xl">
        <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-6">
          <div class="lg:col-span-2">
            <aside
              class="hidden lg:block overflow-y-auto lg:max-h-[calc(100vh-var(--header-height))] lg:sticky"
            >
              <AppNavigation />
            </aside>
          </div>
          <div class="lg:col-span-8">
            <div
              class="overflow-y-auto lg:max-h-[calc(100vh-var(--header-height))] lg:sticky"
            >
              <slot />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
