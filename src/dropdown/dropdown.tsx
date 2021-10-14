import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import Popup from '../popup';
import DropdownMenu from './dropdown-menu';
import { emitEvent } from '../utils/event';
import { DropdownOption } from './type';
import props from './props';

const name = `${prefix}-dropdown`;

export default Vue.extend({
  name: 'TDropdown',
  props: {
    ...props,
  },
  methods: {
    handleMenuClick(data: DropdownOption, context: { e: MouseEvent }) {
      if (this.hideAfterItemClick) {
        const {
          popupElem,
        }: any = this.$refs;
        popupElem.handleClose();
      }
      emitEvent(this, 'click', data, context);
    },
  },
  render() {
    const trigger: VNode[] | VNode | string = this.$scopedSlots.default
      ? this.$scopedSlots.default(null) : '';

    const popupProps = {
      props: {
        ...this.$attrs,
        ...this.popupProps,
        disabled: this.disabled,
        placement: this.placement,
        trigger: this.trigger,
        overlayClassName: this.popupProps && this.popupProps.overlayClassName ? [name, this.popupProps.overlayClassName] : name,
      },
      ref: 'popup',
    };

    return (
      <Popup {...popupProps} ref="popupElem" expandAnimation={true}>
        <template slot='content' role='dropdown'>
          <DropdownMenu
            options={this.options}
            maxHeight={this.maxHeight}
            maxColumnWidth={this.maxColumnWidth}
            minColumnWidth={this.minColumnWidth}
            onClick={this.handleMenuClick}
          />
        </template>
        {trigger}
      </Popup>
    );
  },
});
