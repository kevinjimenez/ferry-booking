<template>
  <div class="flex p-10 gap-x-10">
    <!-- Left column -->
    <div class="flex flex-col gap-y-6 w-1/2">
      <!-- PassengersSummaryCard -->
      <div class="border border-base-300 rounded-md p-5 flex flex-col gap-y-4">
        <div class="flex items-center gap-x-2">
          <div class="skeleton size-5 rounded-md" />
          <div class="skeleton h-4 w-24 rounded-md" />
        </div>
        <div class="flex items-center gap-x-3">
          <div class="skeleton size-10 rounded-md" />
          <div class="flex flex-col gap-y-2">
            <div class="skeleton h-4 w-28 rounded-md" />
            <div class="skeleton h-3 w-20 rounded-md" />
          </div>
        </div>
      </div>

      <!-- PaymentSummaryCard -->
      <div class="border border-base-300 rounded-md p-5 flex flex-col gap-y-4">
        <div class="flex items-center gap-x-2">
          <div class="skeleton size-5 rounded-md" />
          <div class="skeleton h-4 w-32 rounded-md" />
        </div>
        <div class="flex justify-between">
          <div class="skeleton h-4 w-24 rounded-md" />
          <div class="skeleton h-4 w-20 rounded-md" />
        </div>
        <div class="flex justify-between">
          <div class="skeleton h-4 w-24 rounded-md" />
          <div class="skeleton h-4 w-20 rounded-md" />
        </div>
        <div class="skeleton h-px w-full" />
        <div class="flex justify-between items-center">
          <div class="skeleton h-5 w-12 rounded-md" />
          <div class="skeleton h-7 w-24 rounded-md" />
        </div>
      </div>

      <!-- TripIncludesCard -->
      <div class="border-2 border-base-300 rounded-md p-5 flex flex-col gap-y-3">
        <div class="skeleton h-4 w-36 rounded-md" />
        <div v-for="i in 3" :key="i" class="flex items-center gap-x-2">
          <div class="skeleton size-4 rounded-md" />
          <div class="skeleton h-3 w-40 rounded-md" />
        </div>
      </div>
    </div>

    <!-- Right column — Payphone widget -->
    <div class="flex flex-col w-1/2">
      <div class="border-2 border-base-300 rounded-md p-6 flex flex-col gap-y-5">
        <div class="skeleton h-4 w-40 rounded-md" />
        <div class="flex gap-x-3">
          <div class="skeleton h-12 flex-1 rounded-md" />
          <div class="skeleton h-12 flex-1 rounded-md" />
        </div>
        <div class="skeleton h-px w-full" />
        <div class="flex flex-col gap-y-3">
          <div class="skeleton h-4 w-32 rounded-md" />
          <div class="skeleton h-10 w-full rounded-md" />
        </div>
        <div class="skeleton h-12 w-full rounded-md" />
      </div>
    </div>
  </div>
</template>
