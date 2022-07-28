{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "stakater-cloud-docs-v2.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "stakater-cloud-docs-v2.labels.selector" -}}
app: {{ template "stakater-cloud-docs-v2.name" . }}
group: {{ .Values.stakaterclouddocs-v2.labels.group }}
provider: {{ .Values.stakaterclouddocs-v2.labels.provider }}
{{- end -}}

{{- define "stakater-cloud-docs-v2.labels.stakater" -}}
{{ template "stakater-cloud-docs-v2.labels.selector" . }}
version: "{{ .Values.stakaterclouddocs-v2.labels.version }}"
{{- end -}}

{{- define "stakater-cloud-docs-v2.labels.chart" -}}
chart: "{{ .Chart.Name }}-{{ .Chart.Version }}"
release: {{ .Release.Name | quote }}
heritage: {{ .Release.Service | quote }}
{{- end -}}
