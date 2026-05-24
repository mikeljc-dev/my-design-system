import './styles/tailwind.css';
import type { App } from 'vue';

// Original components
import DsButton    from './components/Button/Button.vue';
import DsInput     from './components/Input/Input.vue';
import DsBadge     from './components/Badge/Badge.vue';
import DsAvatar    from './components/Avatar/Avatar.vue';
import DsCard      from './components/Card/Card.vue';
import DsModal     from './components/Modal/Modal.vue';
import DsToast     from './components/Toast/Toast.vue';

// Form components
import DsCheckbox  from './components/Checkbox/Checkbox.vue';
import DsSwitch    from './components/Switch/Switch.vue';
import DsRadio     from './components/Radio/Radio.vue';
import DsSelect    from './components/Select/Select.vue';
import DsTextarea  from './components/Textarea/Textarea.vue';

// Feedback components
import DsAlert     from './components/Alert/Alert.vue';
import DsSpinner   from './components/Spinner/Spinner.vue';
import DsSkeleton  from './components/Skeleton/Skeleton.vue';
import DsProgress  from './components/Progress/Progress.vue';

// Navigation components
import DsTabs       from './components/Tabs/Tabs.vue';
import DsAccordion  from './components/Accordion/Accordion.vue';
import DsBreadcrumb from './components/Breadcrumb/Breadcrumb.vue';
import DsPagination from './components/Pagination/Pagination.vue';

// Overlay components
import DsTooltip   from './components/Tooltip/Tooltip.vue';
import DsDropdown  from './components/Dropdown/Dropdown.vue';

export {
  DsButton, DsInput, DsBadge, DsAvatar, DsCard, DsModal, DsToast,
  DsCheckbox, DsSwitch, DsRadio, DsSelect, DsTextarea,
  DsAlert, DsSpinner, DsSkeleton, DsProgress,
  DsTabs, DsAccordion, DsBreadcrumb, DsPagination,
  DsTooltip, DsDropdown,
};

export { useToast }          from './composables/useToast';
export type { Toast }        from './composables/useToast';
export type { AccordionItem } from './components/Accordion/Accordion.vue';
export type { BreadcrumbItem } from './components/Breadcrumb/Breadcrumb.vue';
export type { DropdownItem }  from './components/Dropdown/Dropdown.vue';
export type { TabItem }       from './components/Tabs/Tabs.vue';

export const install = (app: App) => {
  app.component('DsButton',     DsButton);
  app.component('DsInput',      DsInput);
  app.component('DsBadge',      DsBadge);
  app.component('DsAvatar',     DsAvatar);
  app.component('DsCard',       DsCard);
  app.component('DsModal',      DsModal);
  app.component('DsToast',      DsToast);
  app.component('DsCheckbox',   DsCheckbox);
  app.component('DsSwitch',     DsSwitch);
  app.component('DsRadio',      DsRadio);
  app.component('DsSelect',     DsSelect);
  app.component('DsTextarea',   DsTextarea);
  app.component('DsAlert',      DsAlert);
  app.component('DsSpinner',    DsSpinner);
  app.component('DsSkeleton',   DsSkeleton);
  app.component('DsProgress',   DsProgress);
  app.component('DsTabs',       DsTabs);
  app.component('DsAccordion',  DsAccordion);
  app.component('DsBreadcrumb', DsBreadcrumb);
  app.component('DsPagination', DsPagination);
  app.component('DsTooltip',    DsTooltip);
  app.component('DsDropdown',   DsDropdown);
};
