---
id: version-1.2.7-doc-resource-patching
title: Resource Patching
original_id: doc-resource-patching
---

The CLDR data represents a series of decisions about which values should be chosen for a given locale. In some cases these choices are obvious and there is a high amount of agreement. In other cases the choice is 

In some of these cases a user may want to override the CLDR and substitute a value of their own. An example of this is the Swedish display name for Ivory Coast: "Côte d’Ivoire". An alternative name is "Elfenbenskusten" which was the default prior to CLDR release v36. Some users may wish to return to this original value.

## Navigating the data schema

The schema is currently defined in code as a series of TypeScript interfaces and accessors which transform the original CLDR JSON files into a more compact form, with all compound keys decomposed and organized into a reasonable hierarchy. 

You can use the `cldr-compiler schema` command to dump the schema for inspection and as a guide for patch file creation:

```bash
% cldr-compiler schema  -l sv -v
Scanning sv..
Scanning sv-AX..
Scanning sv-FI..

% cat Schema.json | jq .Names.regions.displayName.none.CI
{
  "Côte d’Ivoire": 3
}
```

The count shows the number of locales that have a given value defined.  If we include Korean we should see an additional value:

```bash
% cldr-compiler schema  -l ko,sv -v
Scanning ko..
Scanning ko-KP..
Scanning sv..
Scanning sv-AX..
Scanning sv-FI..

% cat Schema.json | jq .Names.regions.displayName.none.CI
{
  "코트디부아르": 2,
  "Côte d’Ivoire": 3
}
```

In the path `Names.regions.displayName.none.CI`, the segment `none` refers to the default value (as opposed to the variant), and `CI` is the country code for "Ivory Coast".

By specifying both a path and a replacement value we can create patches to customize our resource files.

## Applying patches

The `cldr-compiler` is responsible for generating the resource packs that are loaded at runtime. These resource packs contain all of the locale-specific strings for date formats, display names, etc.

Our patch format is a wrapper around the [JSON PATCH format](http://jsonpatch.com/). JSON PATCH operations are associated with a glob pattern to match one or more locales.

Using our example above we can apply a patch to customize the resource packs at build time. An example of a patch that overrides the display name for "Ivory Coast" in Swedish locales would look like this:

```yaml
# We specify a version to retain the ability to alter the patch format in the future
version: 1
patches:
  # A list of locales follows, each having a list of operations to be applied

  # For Swedish, change the value for CI "Ivory Coast"
  - locales: sv,sv-*
    operations:
      # A "replace" operation replaces an existing key.
      - op: replace
        path: /Names/regions/displayName/none/CI
        value: Elfenbenskusten
```

Next we compile the resource packs and specify a path to our patch file:

```bash
% cldr-compiler pack -o custom -l ko,sv -p example-patch.yaml
processing:  ko
writing:     custom/ko.json
writing:     custom/ko.json.gz
processing:  sv
patching:    sv from example-patch.yaml
patching:    sv-AX from example-patch.yaml
patching:    sv-FI from example-patch.yaml
writing:     custom/sv.json
writing:     custom/sv.json.gz
writing:     custom/sha256sums.txt
writing:     custom/resource.json
```

Finally we can dump the patched `sv.json` resource pack to see that our replacement string is present. Note that the value for CI is just before CK "Cook Islands" and CL "Chile":

```bash
% cldr-compiler dump -p ./custom/sv.json | grep -B2 Elfenbenskusten --color=always
   displayName
    VectorArrow (5714, 7773)
     ["E","världen","Afrika", ... "Elfenbenskusten","Cooköarna","Chile", ...]
```
