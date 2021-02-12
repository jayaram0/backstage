/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Base properties that all indexed documents must include, as well as some
 * common properties that documents are encouraged to use where appropriate.
 */
export interface IndexableDocument {
  /**
   * The primary name of the document (e.g. name, title, identifier, etc).
   */
  title: string;

  /**
   * Free-form text of the document (e.g. description, content, etc).
   */
  text: string;

  /**
   * The relative or absolute URL of the document (target when a search result
   * is clicked).
   */
  location: string;

  /**
   * The owner of the document (e.g. spec.owner on a catalog entity).
   */
  owner?: string;

  /**
   * The lifecycle of the document (e.g. spec.lifecycle on a catalog entity).
   */
  lifecycle?: string;
}

/**
 * Signature for the callback function that implementors must register to have
 * their documents indexed.
 */
export type IndexableDocumentCollator = () => Promise<IndexableDocument[]>;

/**
 * Signature for the callback function that implementors must register to
 * decorate existing documents with additional metadata.
 */
export type IndexableDocumentDecorator = (
  documents: IndexableDocument[],
) => Promise<IndexableDocument[]>;

/**
 * Parameters required to register a collator.
 */
export interface RegisterCollatorParameters {
  /**
   * The type of document to be indexed (used to name indices, to configure refresh loop, etc).
   */
  type: string;

  /**
   * The default interval (in seconds) that the provided collator will be called (can be overridden in config).
   */
  defaultRefreshIntervalSeconds: number;

  /**
   * The collator function responsible for returning all documents of the given type.
   */
  collator: IndexableDocumentCollator;
}

/**
 * Parameters required to register a decorator
 */
export interface RegisterDecoratorParameters {
  /**
   * The decorator function responsible for appending or modifying documents of the given type(s).
   */
  decorator: IndexableDocumentDecorator;

  /**
   * An optional array of document types that the given decorator should apply to. If none are provided,
   * the decorator will be applied to all types.
   */
  types?: string[];
}
