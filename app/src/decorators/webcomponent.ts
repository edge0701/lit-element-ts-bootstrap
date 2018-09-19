/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * A TypeScript class decorator factory that defines a custom element with name
 * `tagname` and the decorated class. If `tagname` is not provided, the static
 * `is` property of the class is used.
 */
export function customElement(tagname?: string, mixin?: any) {
  // TODO Investigate narrowing down the type of clazz.
  return (clazz: any) => {
    // TODO(justinfagnani): we could also use the kebab-cased class name
    if (clazz.is) {
      tagname = clazz.is;
    } else {
      clazz.is = tagname;
    }
    if (mixin) {
      window.customElements.define(tagname!, mixin(clazz));
    } else {
      window.customElements.define(tagname!, clazz);
    }
  };
}

/**
 * Options for the @property decorator.
 * See https://www.polymer-project.org/2.0/docs/devguide/properties.
 */
export interface PropertyOptions {
  /**
   * This field can be omitted if the Metadata Reflection API is configured.
   */
  type?: BooleanConstructor|DateConstructor|NumberConstructor|StringConstructor|
      ArrayConstructor|ObjectConstructor;
  notify?: boolean;
  reflectToAttribute?: boolean;
  readOnly?: boolean;
  computed?: string;
  observer?: string|((val: any, old: any) => void);
}

function createProperty(
    proto: any, name: string, options?: PropertyOptions): void {
  if (!proto.constructor.hasOwnProperty('properties')) {
    Object.defineProperty(proto.constructor, 'properties', {value: {}});
  }

  const finalOpts: PropertyOptions = {
    ...proto.constructor.properties[name] as PropertyOptions | undefined,
    ...options,
  };

  if (!finalOpts.type) {
    const reflect = (window as any).Reflect;
    if (reflect.hasMetadata && reflect.getMetadata &&
        reflect.hasMetadata('design:type', proto, name)) {
      finalOpts.type = reflect.getMetadata('design:type', proto, name);
    } else {
      console.error(
          `A type could not be found for ${name}. ` +
          'Set a type or configure Metadata Reflection API support.');
    }
  }

  proto.constructor.properties[name] = finalOpts;
}

/**
 * A TypeScript property decorator factory that defines this as a Polymer
 * property.
 *
 * This function must be invoked to return a decorator.
 */
export function property(options?: PropertyOptions) {
  return (proto: any, propName: string): any => {
    createProperty(proto, propName, options);
  };
}
